import {
  SET_CURRENT_PLAY_TRACK,
  SET_CURRENT_PLAYLIST,
  SET_CURRENT_ALBUM,
  SET_CURRENT_ARTIST,
} from './SRPATab.actionTypes';

const initialState = {
  currentPlayTrack: null,
  currentPlaylist: null,
  currentAlbum: null,
  currentArtist: null,
}

export default function SRPATabReducer(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_PLAY_TRACK:
      return {
        ...state,
        currentPlayTrack: {
          ...state.currentPlayTrack,
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

    case SET_CURRENT_ALBUM:
      return {
        ...state,
        currentAlbum: {
          ...action.payload,
        }
      }

    case SET_CURRENT_ARTIST:
      return {
        ...state,
        currentArtist: {
          ...action.payload,
        }
      }
    default:
      return state;
  }
}