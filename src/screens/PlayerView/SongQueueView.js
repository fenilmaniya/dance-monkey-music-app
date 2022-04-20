import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Header, TrackList } from '../../components';
import { useAppAccessor } from '../../hooks';
import Icon from '../../lib/Icons';
import styles from './styles';
import { updateSongQueue } from './playerView.actions';

export default function SongQueueView() {

  const dispatch = useDispatch();
  const { getPlayerQueue } = useAppAccessor();
  const playerQueue = getPlayerQueue();

  return (
    <View style={styles.container}>
      <Header 
        title={'Song Queue'} 
        right={<Icon name="refresh" fill="#fff" height="16" width="16" />}
        onRightPress={() => {
          if (playerQueue && playerQueue.length > 2) {
            dispatch(updateSongQueue(playerQueue[1]));
          }
        }}
      />
      <TrackList tracks={playerQueue}/>
    </View>
  )
}