import { Q } from '@nozbe/watermelondb';
import { appBaseUrlsRef, appSecretsRef } from '../../dao/dao.helper';
import {
  SET_APP_SECRET,
  SET_APP_FAVORITE_TRACKS,
} from '../../application/app.actionTypes';
import db from '../../db';
import getTrackId from '../../utils/getTrackId';

export const fetchConstants = () => {
  return dispatch => {
    const base_url = appBaseUrlsRef()
      .get()
      .then(snap => {
        if (snap.exists) {
          return snap.data();
        }
        return null;
      });

    const secret = appSecretsRef()
      .get()
      .then(snap => {
        if (snap.exists) {
          return snap.data();
        }

        return null;
      });

    return Promise.all([base_url, secret])
      .then(res => {
        dispatch({
          type: SET_APP_SECRET,
          payload: {
            old_base_url: res[0].old_base,
            search_url: res[0].search_url,
            smart_feeds: res[0].smart_feeds,
            api_secret: res[1].api_secret,
          }
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export const fetchFavorites = () => {
  
  return async dispatch => {
    const favoritePlaylistCollection = db.collections.get('f_playlists');
    const favoritePlaylist = await favoritePlaylistCollection.query(Q.where('playlist_id', 'favorites')).fetch();
  
    if (favoritePlaylist && favoritePlaylist.length > 0) {
  
      const tracks = favoritePlaylist[0].tracks;
      dispatch({
        type: SET_APP_FAVORITE_TRACKS,
        payload: tracks.map(track => getTrackId(track))
      });
    }
  }
}