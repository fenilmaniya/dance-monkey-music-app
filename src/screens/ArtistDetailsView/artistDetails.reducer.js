import {
  FETCH_ARTIST_DETAILS_REQUEST,
  FETCH_ARTIST_DETAILS_RESPONSE,
  FETCH_ARTIST_DETAILS_ERROR,
} from './artistDetails.actionTypes';

const initialState = {
  artistDetail: null,
  loading: false,
}

export default function playlistDetailsReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_ARTIST_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        artistDetail: null,
      }
    case FETCH_ARTIST_DETAILS_RESPONSE:
      return {
        ...state,
        loading: false,
        artistDetail: action.payload ?? null,
      }
    case FETCH_ARTIST_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        artistDetail: null
      }
    default:
      return state;
  }
}