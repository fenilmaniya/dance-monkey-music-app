import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import TrackPlayer, { useTrackPlayerEvents, Event, State } from 'react-native-track-player';
import { useDispatch } from 'react-redux';
import Icon from '../lib/Icons';
import { skipToNext, skipToPrevious } from '../screens/PlayerView/playerView.actions';

const events = [
  Event.PlaybackError,
  Event.PlaybackState,
  Event.PlaybackQueueEnded
];

export default function PlayerController() {
  const [playerState, setPlayerState] = useState(null);

  const dispatch = useDispatch();
  
  useTrackPlayerEvents(events, (event) => {
    if (event.type === Event.PlaybackError) {
      console.warn('An error occured while playing the current track.');
    }
    if (event.type === Event.PlaybackState) {
      setPlayerState(event.state);
    }
    if (event.type === Event.PlaybackQueueEnded) {
      
      dispatch(skipToNext());
    }
  });


  const isPlaying = playerState === State.Playing;

  const handlePrevious = () => {

    dispatch(skipToPrevious());
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      TrackPlayer.pause()
    } else {
      TrackPlayer.play();
    }
  }

  const handleNext = () => {
    dispatch(skipToNext());
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={handlePrevious}
        style={styles.iconContainer}>
        <Icon name="previous" fill="#fff" height="24" width="24" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePlayPause}
        style={[
          styles.iconContainer,
          { marginLeft: 4 }
        ]}
      >
        <Icon name={`${isPlaying ? 'pause' : 'play'}`} fill="#fff" height="30" width="30" />
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={handleNext}
        style={styles.iconContainer}>
        <Icon name="next" fill="#fff" height="24" width="24" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    flexDirection: 'row'
  },
  iconContainer: {
    padding: 10,
  }
})