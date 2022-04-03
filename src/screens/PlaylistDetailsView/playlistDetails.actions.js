import {
  FETCH_PLAYLIST_DETAILS_REQUEST,
  FETCH_PLAYLIST_DETAILS_RESPONSE,
  FETCH_PLAYLIST_DETAILS_ERROR,
} from './playlistDetails.actionTypes';
import { apiGet } from '../../dao';
import { urls } from '../../constants';

export function fetchPlaylistDetails(playlist_id) {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_PLAYLIST_DETAILS_REQUEST,
    })

    const state = getState();
    const app = state.app;

    apiGet({
      app,
      route: `${urls.playlist_details}${playlist_id}`
    })
    .then(data => {
      dispatch({
        type: FETCH_PLAYLIST_DETAILS_RESPONSE,
        payload: data,
      });
    })
    .catch(error => {
      
      console.log(error);
      dispatch({
        type: FETCH_PLAYLIST_DETAILS_ERROR,
      });
    });
  }
}