import { urls } from '../../constants';
import { apiGet } from '../../dao';
import {
  SEARCH_QUERY_REQUEST,
  SEARCH_QUERY_RESPONSE,
  SEARCH_QUERY_ERROR
} from './HomeView.actionTypes';

export const searchWithQuery = (query) => {
  return (dispatch, getState) => {
    dispatch({
      type: SEARCH_QUERY_REQUEST
    });

    const state = getState();
    const app = state.app;

    apiGet({
      app,
      route: `${urls.search}${query}`
    })
    .then(res => {
      if (res) {
        dispatch({
          type: SEARCH_QUERY_RESPONSE,
          payload : {
            tracks: res?.tracks ?? []
          }
        });
      }
    })
    .catch(err => {
      dispatch({
        type: SEARCH_QUERY_ERROR
      });
    });
  }
}