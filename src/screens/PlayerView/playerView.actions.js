import TrackPlayer from 'react-native-track-player';
import base64 from 'js-base64';
import cryptoJs from "crypto-js";
import { Q } from '@nozbe/watermelondb';
import { urls } from '../../constants';
import { encodeParamsForUrl } from '../../utils/url';
import { apiGet, apiPost } from "../../dao";
import {
  SET_CURRENT_PLAY_TRACK
} from '../SRPATab/SRPATab.actionTypes';
import { isNumber } from 'lodash';
import {
  ADD_TO_PLAYER_QEUEUE
} from './playerView.actionTypes';
import db from '../../db';

export const fetchCurrentTrackURL = (track) => {
  return async (dispatch, getState) => {

    let trackIndex = await TrackPlayer.getCurrentTrack();
    
    if (isNumber(trackIndex)) {
      
      let trackObj = await TrackPlayer.getTrack(trackIndex);
      if (track && trackObj.track_id === (track?.track_id ?? track.iid)) return;
    }
    
    const state = getState();
    const app = state.app;
    const { api_secret } = app;

    if (track.iid) {

      const res = await fetch(`https://gaana.com/apiv2?type=songDetail&seokey=${track.seo}`, { method: 'post'})
      if (res.ok && res.status == 200) {
        const json = await res.json();
        track = json.tracks[0];
        dispatch({
          type: SET_CURRENT_PLAY_TRACK,
          payload: {
            ...track,
          }
        });
      } else {
        console.log('unable to find track details');
        return;
      }
    }

    let { album_id, artwork, duration, track_id, track_title, artist } = track;

    let data = base64.encode(track_id);
    let signature = cryptoJs.HmacMD5(data, api_secret).toString();

    let params = {
      "track_id": track_id,
      "album_id": album_id,
      "type": "rtmp",
      "isrc": "INUM72000090",
      "delivery_type": "stream",
      "quality": "high",
      "hashcode": signature,
    }
    
    apiGet({
      app,
      route: `${urls.getTrack}${encodeParamsForUrl(params)}`,
      needHaeder: true,
    })
    .then(async d => {
      dispatch({
        type: SET_CURRENT_PLAY_TRACK,
        payload: {
          ...track,
          track_url: base64.decode(d.data)
        }
      });

      await TrackPlayer.destroy()
      
      await TrackPlayer.add([
        {
          url: base64.decode(d.data),
          title: track_title,
          artist: artist[0].name,
          // Load artwork from the file system:
          artwork: artwork,
          duration: duration,
          track_id: track_id,
        }
      ]);

      await TrackPlayer.play();
    });
  }
}

export const generatePlayList = (playerQueue, currentTrack) => {

  return dispatch => {

    if (playerQueue && playerQueue.length > 0) {

      const currentTrackIndex = playerQueue.findIndex(track => track.track_id === currentTrack.track_id);
      if (isNumber(currentTrackIndex)) return;
    }

    apiPost({
      isOld: false,
      route: `${urls.similar_songs}${currentTrack.track_id ?? currentTrack.id}`
    })
    .then(data => {
      const tracks = data.tracks ?? [];
      tracks.unshift(currentTrack);

      dispatch({
        type: ADD_TO_PLAYER_QEUEUE,
        payload: tracks,
      })
    });
  }
}

export const addToFavorite = async (currentTrack) => {
  const favoritePlaylistCollection = db.collections.get('f_playlists');
  const favoritePlaylist = await favoritePlaylistCollection.query(Q.where('playlist_id', 'favorites')).fetch();
  
  if (favoritePlaylist && favoritePlaylist.length > 0) {

    const tracks = favoritePlaylist[0].tracks;
    if (!tracks.find(track => track.track_id === currentTrack.track_id)) {
      tracks.push(currentTrack);

      db.action(async () => {

        await favoritePlaylist[0].update(FPlaylist => {
          FPlaylist.playlist_id = 'favorites',
          FPlaylist.tracks = tracks
        });
      });
    }
  } else {
    db.action(async () => {

      await favoritePlaylistCollection.create(FPlaylist => {
        FPlaylist.title = 'Favorites',
        FPlaylist.playlist_id = 'favorites',
        FPlaylist.tracks = [currentTrack]
      });
    });
  }
}

export const skipToPrevious = () => {
  return (dispatch, getState) => {
    const state = getState();
    const playerQueue = state.player.playerQueue;
    const currentTrack = state.SRPA.currentPlayTrack;

    if (!playerQueue || playerQueue.length === 0) return;

    const currentTrackIndex = playerQueue.findIndex(track => track.track_id === currentTrack.track_id);
    if (!isNumber(currentTrackIndex)) return;

    const nextIndex = currentTrackIndex === 0 ? playerQueue.length - 1 : currentTrackIndex - 1;
    dispatch(fetchCurrentTrackURL(playerQueue[nextIndex]));
  }
}

export const skipToNext = () => {
  return (dispatch, getState) => {
    const state = getState();
    const playerQueue = state.player.playerQueue;
    const currentTrack = state.SRPA.currentPlayTrack;

    if (!playerQueue || playerQueue.length === 0) return;

    const currentTrackIndex = playerQueue.findIndex(track => track.track_id === currentTrack.track_id);
    if (!isNumber(currentTrackIndex)) return;

    const nextIndex = currentTrackIndex === playerQueue.length - 1 ? 0 : currentTrackIndex + 1;
    dispatch(fetchCurrentTrackURL(playerQueue[nextIndex]));
  }
}