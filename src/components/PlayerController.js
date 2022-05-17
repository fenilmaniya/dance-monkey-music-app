import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import TrackPlayer, {  State } from 'react-native-track-player';
import { useDispatch } from 'react-redux';
import { useAppAccessor } from '../hooks';
import Icon from '../lib/Icons';
import { skipToNext, skipToPrevious } from '../screens/PlayerView/playerView.actions';

export default function PlayerController({ mini = false }) {
  const iconSize = mini ? 20 : 24;
  
  const dispatch = useDispatch();
  const { getPlayerState } = useAppAccessor();
  const playerState = getPlayerState();
  
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
        testID={'player-previous'}
        onPress={handlePrevious}
        style={styles.iconContainer}>
        <Icon name="previous" fill="#fff" height={iconSize} width={iconSize} />
      </TouchableOpacity>
      <TouchableOpacity
        testID={'player-play-pause'}
        onPress={handlePlayPause}
        style={[
          styles.iconContainer,
          { marginLeft: 4 }
        ]}
      >
        <Icon name={`${isPlaying ? 'pause' : 'play'}`} fill="#fff" height={iconSize + 6} width={iconSize + 6} />
      </TouchableOpacity>
      <TouchableOpacity 
        testID={'player-next'}
        onPress={handleNext}
        style={styles.iconContainer}>
        <Icon name="next" fill="#fff" height={iconSize} width={iconSize} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  iconContainer: {
    padding: 10,
  }
})