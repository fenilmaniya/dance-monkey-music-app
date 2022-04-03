import {
  SET_APP_SECRET
} from './app.actionTypes';
import { RootEnum } from '../definitions';

const initialState = {
  old_base_url: null,
  api_secret: null,
  root: RootEnum.ROOT_LOADING,
}

export default function loginReducer(state = initialState, action = {}) {

  switch(action.type) {
    case SET_APP_SECRET:
      return {
        ...state,
        ...action.payload,
        root: RootEnum.ROOT_INSIDE,
      }
    default:
      return state;
  }
}