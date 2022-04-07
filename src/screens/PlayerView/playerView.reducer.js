import {
  ADD_TO_PLAYER_QEUEUE,
} from './playerView.actionTypes';

const initialState = {
  playerQueue: []
}

export default function playerViewReducer(state = initialState, action) {

  switch(action.type) {
    case ADD_TO_PLAYER_QEUEUE:
      return {
        ...state,
        playerQueue: action.payload
      }

    default:
      return state;
  }
}