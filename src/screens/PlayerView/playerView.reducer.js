import {
  ADD_TO_PLAYER_QEUEUE,
  SET_PLAYER_STATE,
} from './playerView.actionTypes';

const initialState = {
  playerQueue: [],
  playerState: null
}

export default function playerViewReducer(state = initialState, action) {

  switch(action.type) {
    case ADD_TO_PLAYER_QEUEUE:
      return {
        ...state,
        playerQueue: action.payload
      }

    case SET_PLAYER_STATE:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state;
  }
}