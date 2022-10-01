import TrackPlayer from 'react-native-track-player';
import RNFetchBlob from 'rn-fetch-blob';
import base64 from 'js-base64';
import cryptoJs from "crypto-js";
import { Q } from '@nozbe/watermelondb';
import { urls } from '../../constants';
import { encodeParamsForUrl } from '../../utils/url';
import getTrackId from '../../utils/getTrackId';
import { apiGet, apiPost } from "../../dao";
import {
  SET_CURRENT_PLAY_TRACK
} from '../SRPATab/SRPATab.actionTypes';
import { isNumber } from 'lodash';
import {
  ADD_TO_PLAYER_QEUEUE,
  SET_PLAYER_STATE
} from './playerView.actionTypes';
import db from '../../db';
import { fetchFavorites } from '../LoadingView/loadingView.actions';

export const fetchCurrentTrackURL = (track) => {
  return async (dispatch, getState) => {

    const state = getState();
    const app = state.app;
    const { api_secret, favorite_tracks } = app;

    console.log(favorite_tracks, getTrackId(track))

    const isFavorite = favorite_tracks.includes(getTrackId(track));
    dispatch({
      type: SET_CURRENT_PLAY_TRACK,
      payload: {
        ...track,
        isFavorite
      }
    });

    let trackIndex = await TrackPlayer.getCurrentTrack();
    
    if (isNumber(trackIndex)) {
      
      let trackObj = await TrackPlayer.getTrack(trackIndex);
      if (track && getTrackId(trackObj) === getTrackId(track)) return;
    }

    if (getTrackId(track)) {

      const res = await apiPost({
        app,
        isOld: false,
        needHaeder: false,
        route: `${urls.song_details}${track.seo ?? track.seokey}`
      });
      if (res) {
        track = res.tracks[0];
        dispatch({
          type: SET_CURRENT_PLAY_TRACK,
          payload: {
            ...track,
            isFavorite
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
          isFavorite,
          track_url: base64.decode(d.data)
        }
      });
      
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

      if ((await TrackPlayer.getQueue()).length > 1) {
        await TrackPlayer.skipToNext();
      }
      
      await TrackPlayer.play();
    });
  }
}

export const generatePlayList = (playerQueue, currentTrack) => {

  return dispatch => {

    if (playerQueue && playerQueue.length > 0) {

      const currentTrackIndex = playerQueue.findIndex(track => track.track_id === currentTrack.track_id);
      if (isNumber(currentTrackIndex) && currentTrackIndex>=0) return;
    }

    const track_id = getTrackId(currentTrack);
    apiPost({
      isOld: false,
      route: `${urls.similar_songs}${track_id}`
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

export const updateSongQueue = (track) => {

  const track_id = getTrackId(track);
  return dispatch => {

    apiPost({
      isOld: false,
      route: `${urls.similar_songs}${track_id}`
    })
    .then(data => {
      const tracks = data.tracks ?? [];
      tracks.unshift(track);

      dispatch({
        type: ADD_TO_PLAYER_QEUEUE,
        payload: tracks,
      })
    });
  }
}

export const addToFavorite = (currentTrack, isFavorite) => {
  return async dispatch => {

    const favoritePlaylistCollection = db.collections.get('f_playlists');
    const favoritePlaylist = await favoritePlaylistCollection.query(Q.where('playlist_id', 'favorites')).fetch();
    
    if (favoritePlaylist && favoritePlaylist.length > 0) {
  
      const tracks = favoritePlaylist[0].tracks;
      let updatedTracks = tracks;
      if (!tracks.find(track => getTrackId(track) === getTrackId(currentTrack))) {
        updatedTracks.push(currentTrack);
      } else {
        updatedTracks = tracks.filter(track => getTrackId(track) !== getTrackId(currentTrack));
      }
  
      db.action(async () => {
  
        await favoritePlaylist[0].update(FPlaylist => {
          FPlaylist.playlist_id = 'favorites',
          FPlaylist.tracks = updatedTracks
        })
        .then(() => {
          dispatch(fetchFavorites());
        });
      });
    } else {
      db.action(async () => {
  
        await favoritePlaylistCollection.create(FPlaylist => {
          FPlaylist.title = 'Favorites',
          FPlaylist.playlist_id = 'favorites',
          FPlaylist.tracks = [currentTrack]
        })
        .then(() => {
          dispatch(fetchFavorites());
        });
      });
    }

    dispatch({
      type: SET_CURRENT_PLAY_TRACK,
      payload: {
        ...currentTrack,
        isFavorite: !isFavorite,
      }
    });
  }
}

export const skipToPrevious = () => {
  return (dispatch, getState) => {
    const state = getState();
    const playerQueue = state.player.playerQueue;
    const currentTrack = state.SRPA.currentPlayTrack;
    const currentTrackId = getTrackId(currentTrack);

    if (!playerQueue || playerQueue.length === 0) return;

    const currentTrackIndex = playerQueue.findIndex(track => getTrackId(track) === currentTrackId);
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
    const currentTrackId = getTrackId(currentTrack);

    if (!playerQueue || playerQueue.length === 0) return;
    
    const currentTrackIndex = playerQueue.findIndex(track => getTrackId(track) === currentTrackId);
    if (!isNumber(currentTrackIndex)) return;

    const nextIndex = currentTrackIndex === playerQueue.length - 1 ? 0 : currentTrackIndex + 1;
    dispatch(fetchCurrentTrackURL(playerQueue[nextIndex]));
  }
}

export const downloadMP3 = (downloadURL, title) => {
  let dirs = RNFetchBlob.fs.dirs
  RNFetchBlob
    .config({
        // DCIMDir is in external storage
        path : dirs.MusicDir + `/${title}.mp3`
    })
    .fetch('GET', downloadURL)
    .then((res) => RNFetchBlob.fs.scanFile([ { path : res.path(), mime : 'audio/mpeg' } ]))
    .then(() => {
        // scan file success
        console.log('song downloaded');
      })
      .catch((err) => {
        // scan file error
        console.log('error while download');
    })
}

export const setPlayerState = (playerState) => {

  return dispatch => {

    dispatch({
      type: SET_PLAYER_STATE,
      payload: {
        playerState
      }
    })
  }
}