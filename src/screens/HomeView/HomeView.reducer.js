import {
  SEARCH_QUERY_REQUEST,
  SEARCH_QUERY_RESPONSE,
  SEARCH_QUERY_ERROR,
  FETCH_DASHBOARD_REQUEST,
  FETCH_DASHBOARD_ERROR,
  FETCH_DASHBOARD_RESPONSE,
} from './HomeView.actionTypes';

const initialState = {
  loading: false,
  tracks: null,
  error: null,

  dashboard: {
    loading: false,
    smart_feeds: [],
    smartFeedPage: -1,
  },

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
    case FETCH_DASHBOARD_REQUEST:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          loading: true,
          smartFeedPage: state.dashboard.smartFeedPage + 1,
        }
      }
    case FETCH_DASHBOARD_RESPONSE:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          ...action.payload,
          loading: false,
        }
      }
    case FETCH_DASHBOARD_ERROR:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          loading: false,
        }
      }
    default:
      return state;
  }
}