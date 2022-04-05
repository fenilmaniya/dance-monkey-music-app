import {
  SET_CURRENT_PLAY_TRACK,
  SET_CURRENT_PLAYLIST,
} from './SRPATab.actionTypes';

const initialState = {
  currentPlayTrack: null,
  currentPlaylist: null,
}

export default function SRPATabReducer(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_PLAY_TRACK:
      return {
        ...state,
        currentPlayTrack: {
          ...action.payload
        }
      }
    case SET_CURRENT_PLAYLIST:
      return {
        ...state,
        currentPlaylist: {
          ...action.payload,
        }
      }
    default:
      return state;
  }
}