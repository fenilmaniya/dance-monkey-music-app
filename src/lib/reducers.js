import { combineReducers } from 'redux';

import app from '../application/app.reducer';
import home from '../screens/HomeView/HomeView.reducer';
import SRPA from '../screens/SRPATab/SRPATab.reducer';
import playlistDetails from '../screens/PlaylistDetailsView/playlistDetails.reducer';

export default combineReducers({
  app,
  home,
  SRPA,
  playlistDetails,
})