import {
  SET_CURRENT_PLAYLIST,
  SET_CURRENT_PLAY_TRACK
} from './SRPATab.actionTypes';

export const playTrack = (track) => {
  return dispatch => {
    dispatch({
      type: SET_CURRENT_PLAY_TRACK,
      payload: track
    });

    return Promise.resolve(true);
  }
}

export const setCurrentPlaylist = (playlist) => {
  return dispatch => {
    dispatch({
      type: SET_CURRENT_PLAYLIST,
      payload: playlist
    });

    return Promise.resolve(true);
  }
}