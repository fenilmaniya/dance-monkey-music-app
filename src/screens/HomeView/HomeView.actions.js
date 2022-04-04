import { urls } from '../../constants';
import { apiGet } from '../../dao';
import {
  SEARCH_QUERY_REQUEST,
  SEARCH_QUERY_RESPONSE,
  SEARCH_QUERY_ERROR
} from './HomeView.actionTypes';

const search_type = [
  'tracks',
  'album',
  'artist',
  'playlist'
]

export const searchWithQuery = (query) => {
  return async (dispatch, getState) => {
    if (!query) return;

    if (query.trim().length===0) return;

    dispatch({
      type: SEARCH_QUERY_REQUEST
    });

    const state = getState();
    const app = state.app;

    const searchArray = [];

    for (const type of search_type) {
      
      const searchItem = await apiGet({
        app,
        route: `${urls[`search_${type}`]}${query.trim()}`
      })
      .then(res => {
        if (res) {
          console.log(type, res?.[type].length)
          dispatch({
            type: SEARCH_QUERY_RESPONSE,
            payload : {
              [type]: res?.[type] ?? [],
            }
          });
        }
      })
      .catch(err => {
        dispatch({
          type: SEARCH_QUERY_ERROR
        });
      });

      searchArray.push(searchItem);
    }

    return Promise.all(searchArray);
  }
}