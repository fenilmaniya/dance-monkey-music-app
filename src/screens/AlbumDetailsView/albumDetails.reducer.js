import {
  FETCH_ALBUM_DETAILS_REQUEST,
  FETCH_ALBUM_DETAILS_RESPONSE,
  FETCH_ALBUM_DETAILS_ERROR,
} from './albumDetails.actionTypes';

const initialState = {
  albumDetail: null,
  loading: false,
}

export default function playlistDetailsReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_ALBUM_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        albumDetail: null,
      }
    case FETCH_ALBUM_DETAILS_RESPONSE:
      return {
        ...state,
        loading: false,
        albumDetail: action.payload ?? null,
      }
    case FETCH_ALBUM_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        albumDetail: null
      }
    default:
      return state;
  }
}