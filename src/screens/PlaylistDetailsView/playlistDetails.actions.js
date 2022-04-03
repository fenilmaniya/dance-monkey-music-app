import {
  FETCH_PLAYLIST_DETAILS_REQUEST,
  FETCH_PLAYLIST_DETAILS_RESPONSE,
  FETCH_PLAYLIST_DETAILS_ERROR,
} from './playlistDetails.actionTypes';
import { apiGet } from '../../dao';
import { urls } from '../../constants';
import { Q } from '@nozbe/watermelondb';
import db from '../../db';

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

export function fetchFavoritePlaylistDetails() {
  return async dispatch => {

    dispatch({
      type: FETCH_PLAYLIST_DETAILS_REQUEST,
    })

    const favoritePlaylistCollection = db.collections.get('f_playlists');
    const favoritePlaylist = await favoritePlaylistCollection.query(Q.where('playlist_id', 'favorites')).fetch();
    const playlist = favoritePlaylist[0];

    dispatch({
      type: FETCH_PLAYLIST_DETAILS_RESPONSE,
      payload: playlist,
    });
  }
}