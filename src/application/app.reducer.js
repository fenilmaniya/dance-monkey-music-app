import {
  SET_APP_SECRET,
  SET_APP_FAVORITE_TRACKS
} from './app.actionTypes';
import { RootEnum } from '../definitions';

const initialState = {
  old_base_url: null,
  api_secret: null,
  root: RootEnum.ROOT_LOADING,
  favorite_tracks: []
}

export default function loginReducer(state = initialState, action = {}) {

  switch(action.type) {
    case SET_APP_SECRET:
      return {
        ...state,
        ...action.payload,
        root: RootEnum.ROOT_INSIDE,
      }
    case SET_APP_FAVORITE_TRACKS:
      return {
        ...state,
        favorite_tracks: action.payload,
      }
    default:
      return state;
  }
}