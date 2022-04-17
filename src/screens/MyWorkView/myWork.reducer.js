import {
  SET_MY_PLAYLIST,
} from './myWork.actionTypes';

const initialState = {
  playlist: []
}

export default function myWorkReducer(state = initialState, action) {

  switch(action.type) {
    case SET_MY_PLAYLIST:
      return {
        ...state,
        playlist: action.payload
      }

    default:
      return state;
  }
}