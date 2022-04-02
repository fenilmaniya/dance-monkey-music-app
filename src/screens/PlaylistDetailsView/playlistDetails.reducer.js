import {
  FETCH_PLAYLIST_DETAILS_REQUEST,
  FETCH_PLAYLIST_DETAILS_RESPONSE,
  FETCH_PLAYLIST_DETAILS_ERROR,
} from './playlistDetails.actionTypes';

const initialState = {
  playlistDetail: null,
  loading: false,
}

export default function playlistDetailsReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_PLAYLIST_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        playlistDetail: null,
      }
    case FETCH_PLAYLIST_DETAILS_RESPONSE:
      return {
        ...state,
        loading: false,
        playlistDetail: action.payload ?? null,
      }
    case FETCH_PLAYLIST_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        playlistDetail: null
      }
    default:
      return state;
  }
}