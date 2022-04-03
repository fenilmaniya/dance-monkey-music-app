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
  FETCH_PLAYLIST_DETAILS_RESPONSE
} from '../PlaylistDetailsView/playlistDetails.actionTypes';
import db from '../../db';

export const fetchCurrentTrackURL = (track) => {
  return async (dispatch, getState) => {
    
    const state = getState();
    const app = state.app;
    const { api_secret } = app;
    const { album_id, artwork, duration, track_id, track_title, artist } = track;

    const data = base64.encode(track_id);
    const signature = cryptoJs.HmacMD5(data, api_secret).toString();

    const params = {
      "track_id": track_id,
      "album_id": album_id,
      "type": "rtmp",
      "isrc": "INUM72000090",
      "delivery_type": "stream",
      "quality": "high",
      "hashcode": signature,
    }

    let trackIndex = await TrackPlayer.getCurrentTrack();
    
    if (isNumber(trackIndex)) {

      let track = await TrackPlayer.getTrack(trackIndex);
      if (track && track.track_id === track_id) return;
    }

    
    apiGet({
      app,
      route: `${urls.getTrack}${encodeParamsForUrl(params)}`
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

export const generatePlayList = (currentPlaylist, currentTrack) => {

  return dispatch => {

    if (currentPlaylist) {

      const { playlistDetail } = currentPlaylist;

      console.log(playlistDetail.tracks.length);

      if (playlistDetail) {

        const currentTrackIndex = playlistDetail.tracks.findIndex(track => track.track_id === currentTrack.track_id);
        if (isNumber(currentTrackIndex)) return;
      }
    }

    apiPost({
      isOld: false,
      route: `${urls.similar_songs}${currentTrack.track_id}`
    })
    .then(data => {
      const tracks = data.tracks ?? [];
      tracks.unshift(currentTrack);
      dispatch({
        type: FETCH_PLAYLIST_DETAILS_RESPONSE,
        payload: {...{ tracks }},
      });
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
      await db.write(async () => {

        await favoritePlaylist[0].update(FPlaylist => {
          FPlaylist.tracks = tracks
        });
      });
    }
  }
}

export const skipToPrevious = () => {
  return (dispatch, getState) => {
    const state = getState();
    const currentPlaylistDetails = state.playlistDetails;
    const currentTrack = state.SRPA.currentPlayTrack;
    const { playlistDetail } = currentPlaylistDetails;

    if (!playlistDetail) return;

    const currentTrackIndex = playlistDetail.tracks.findIndex(track => track.track_id === currentTrack.track_id);
    if (!isNumber(currentTrackIndex)) return;

    const nextIndex = currentTrackIndex === 0 ? playlistDetail.tracks.length - 1 : currentTrackIndex - 1;
    dispatch(fetchCurrentTrackURL(playlistDetail.tracks[nextIndex]));
  }
}

export const skipToNext = () => {
  return (dispatch, getState) => {
    const state = getState();
    const currentPlaylistDetails = state.playlistDetails;
    const currentTrack = state.SRPA.currentPlayTrack;
    const { playlistDetail } = currentPlaylistDetails;

    if (!playlistDetail) return;

    const currentTrackIndex = playlistDetail.tracks.findIndex(track => track.track_id === currentTrack.track_id);
    if (!isNumber(currentTrackIndex)) return;

    const nextIndex = currentTrackIndex === playlistDetail.tracks.length - 1 ? 0 : currentTrackIndex + 1;
    dispatch(fetchCurrentTrackURL(playlistDetail.tracks[nextIndex]));
  }
}