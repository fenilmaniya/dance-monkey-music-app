import {
  FETCH_ALBUM_DETAILS_REQUEST,
  FETCH_ALBUM_DETAILS_RESPONSE,
  FETCH_ALBUM_DETAILS_ERROR,
} from './albumDetails.actionTypes';
import { apiPost } from '../../dao';
import { urls } from '../../constants';

export function fetchAlbumDetails(seokey) {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_ALBUM_DETAILS_REQUEST,
    })

    const state = getState();
    const app = state.app;

    apiPost({
      app,
      isOld: false,
      route: `${urls.album_details}${seokey}`
    })
    .then(data => {
      dispatch({
        type: FETCH_ALBUM_DETAILS_RESPONSE,
        payload: data,
      });
    })
    .catch(error => {
      
      console.log(error);
      dispatch({
        type: FETCH_ALBUM_DETAILS_ERROR,
      });
    });
  }
}