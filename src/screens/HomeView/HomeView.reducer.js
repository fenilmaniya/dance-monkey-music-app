import {
  SEARCH_QUERY_REQUEST,
  SEARCH_QUERY_RESPONSE,
  SEARCH_QUERY_ERROR
} from './HomeView.actionTypes';

const initialState = {
  loading: false,
  tracks: null,
  error: null,
}

export default function loginReducer(state = initialState, action = {}) {

  switch(action.type) {
    case SEARCH_QUERY_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SEARCH_QUERY_RESPONSE:
      return {
        ...state,
        ...action.payload,
        loading: false,
      }
    case SEARCH_QUERY_ERROR:
      return {
        ...state,
        loading: false,
      }
    default:
      return state;
  }
}