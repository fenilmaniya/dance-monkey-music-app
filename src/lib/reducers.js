import { combineReducers } from 'redux';

import app from '../application/app.reducer';
import home from '../screens/HomeView/HomeView.reducer';
import SRPA from '../screens/SRPATab/SRPATab.reducer';
import playlistDetails from '../screens/PlaylistDetailsView/playlistDetails.reducer';
import albumDetails from '../screens/AlbumDetailsView/albumDetails.reducer';
import artistDetails from '../screens/ArtistDetailsView/artistDetails.reducer';
import player from '../screens/PlayerView/playerView.reducer';
import mywork from '../screens/MyWorkView/myWork.reducer';

export default combineReducers({
  app,
  home,
  SRPA,
  playlistDetails,
  player,
  albumDetails,
  artistDetails,
  mywork,
})