import { combineReducers } from 'redux';

import app from '../application/app.reducer';
import home from '../screens/HomeView/HomeView.reducer';

export default combineReducers({
  app,
  home,
})