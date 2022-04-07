import {
  FETCH_ARTIST_DETAILS_REQUEST,
  FETCH_ARTIST_DETAILS_RESPONSE,
  FETCH_ARTIST_DETAILS_ERROR,
} from './artistDetails.actionTypes';
import { apiPost } from '../../dao';
import { urls } from '../../constants';

export function fetchArtistDetails(seokey) {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_ARTIST_DETAILS_REQUEST,
    })

    const state = getState();
    const app = state.app;

    apiPost({
      app,
      isOld: false,
      route: `${urls.artist_details}${seokey}`
    })
    .then(data => {
      dispatch({
        type: FETCH_ARTIST_DETAILS_RESPONSE,
        payload: data,
      });
    })
    .catch(error => {
      
      console.log(error);
      dispatch({
        type: FETCH_ARTIST_DETAILS_ERROR,
      });
    });
  }
}