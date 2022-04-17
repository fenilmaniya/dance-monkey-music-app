import { Q } from '@nozbe/watermelondb';
import db from '../../db';
import {
  SET_MY_PLAYLIST
} from './myWork.actionTypes';
import { fetchFavorites } from '../LoadingView/loadingView.actions';
import getTrackId from '../../utils/getTrackId';

export const fetchMyWork = () => {

  return async dispatch => {

    const favoritePlaylistCollection = db.collections.get('f_playlists');
    const favoritePlaylist = await favoritePlaylistCollection.query().fetch();

    dispatch({
      type: SET_MY_PLAYLIST,
      payload: favoritePlaylist
    })
  }
}

export const deletePlaylist = (playlistID) => {
  
  return async dispatch => {

    const favoritePlaylistCollection = db.collections.get('f_playlists');
    const favoritePlaylist = await favoritePlaylistCollection.query(Q.where('playlist_id', playlistID)).fetch();

    db.action(async() => {
      await favoritePlaylist[0].markAsDeleted();
      await favoritePlaylist[0].destroyPermanently();
    })
    .then(_ => {
      dispatch(fetchMyWork());
    });
  }
}

export const addTrackToPlaylist = (playlists, currentTrack) => {
  return async dispatch => {

    console.log(playlists);

    const favoritePlaylistCollection = db.collections.get('f_playlists');
    
    for (const playlist of playlists) {

      const favoritePlaylist = await favoritePlaylistCollection.query(Q.where('playlist_id', playlist)).fetch();
      
      if (favoritePlaylist && favoritePlaylist.length > 0) {
    
        const tracks = favoritePlaylist[0].tracks;
        let updatedTracks = tracks;
        if (!tracks.find(track => getTrackId(track) === getTrackId(currentTrack))) {
          updatedTracks.push(currentTrack);
        }
    
        db.action(async () => {
    
          await favoritePlaylist[0].update(FPlaylist => {
            FPlaylist.playlist_id = playlist,
            FPlaylist.tracks = updatedTracks
          })
          .then(() => {
            dispatch(fetchFavorites());
          });
        });
      } else {
        db.action(async () => {
    
          await favoritePlaylistCollection.create(FPlaylist => {
            FPlaylist.title = playlist,
            FPlaylist.playlist_id = 'favorites',
            FPlaylist.tracks = [currentTrack]
          })
          .then(() => {
            dispatch(fetchFavorites());
          });
        });
      }
    }
  }
}