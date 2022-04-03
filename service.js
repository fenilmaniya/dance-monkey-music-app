import TrackPlayer from 'react-native-track-player';
import { skipToNext, skipToPrevious } from './src/screens/PlayerView/playerView.actions';
import store from './src/lib/store';

let didAddListeners = false;

module.exports = async function() {

  if (didAddListeners) {
    console.log('TrackPlayer:', 'Listeners have already been added. Do not add again.');
    return;
  }
  didAddListeners = true;

  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

  TrackPlayer.addEventListener('remote-next', () => {
    store.dispatch(skipToNext());
  });

  TrackPlayer.addEventListener('remote-previous', () => {
    store.dispatch(skipToPrevious());
  })
}