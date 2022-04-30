import db from '../../db';
import { fetchMyWork } from '../../screens/MyWorkView/myWork.actions';

export const createPlaylist = (playlistName) => {

  return dispatch => {
    
    const favoritePlaylistCollection = db.collections.get('f_playlists');
    
    db.action(async () => {
      
      await favoritePlaylistCollection.create(FPlaylist => {
        FPlaylist.title = playlistName,
        FPlaylist.playlist_id = playlistName.toLowerCase(),
        FPlaylist.tracks = []
      });
    })
    .then(_ => {
      dispatch(fetchMyWork());
    })
  }
}