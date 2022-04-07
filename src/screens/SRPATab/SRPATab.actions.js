import {
  SET_CURRENT_PLAYLIST,
  SET_CURRENT_ALBUM,
  SET_CURRENT_PLAY_TRACK,
  SET_CURRENT_ARTIST,
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

export const setCurrentAlbum = (album) => {
  return dispatch => {
    dispatch({
      type: SET_CURRENT_ALBUM,
      payload: album
    });

    return Promise.resolve(true);
  }
}

export const setCurrentArtist = (artist) => {
  return dispatch => {
    dispatch({
      type: SET_CURRENT_ARTIST,
      payload: artist
    });

    return Promise.resolve(true);
  }
}
