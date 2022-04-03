import TrackPlayer from 'react-native-track-player';
import base64 from 'js-base64';
import cryptoJs from "crypto-js";
import { urls } from '../../constants';
import { encodeParamsForUrl } from '../../utils/url';
import { apiGet } from "../../dao";
import {
  SET_CURRENT_PLAY_TRACK
} from '../SRPATab/SRPATab.actionTypes';
import { isNumber } from 'lodash';

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