import React from 'react';
import { Text, FlatList, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants';
import { convertToSSL } from '../utils';
import { playTrack } from '../screens/SRPATab/SRPATab.actions';
import {
  ADD_TO_PLAYER_QEUEUE
} from '../screens/PlayerView/playerView.actionTypes';

export default function TrackList({ tracks, fromSearch }) {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (!fromSearch) {
            dispatch({
              type: ADD_TO_PLAYER_QEUEUE,
              payload: tracks,
            })
          }

          dispatch(playTrack(item))
            .then(() => {
              navigation.navigate('full-screen-player');
            });
        }}
        style={styles.itemContainer}>
        <Image 
          source={{uri: convertToSSL(item.artwork ?? item.aw ?? '')}}
          style={styles.itemImage}
        />
        <View style={styles.textContainer}>
          <Text 
            numberOfLines={1}
            style={styles.itemTitle}>
            {item.track_title ?? item.name ?? item.ti ?? ''}
          </Text>
          <Text 
            numberOfLines={1}
            style={styles.itemSubTitle}>
            {item.secondary_language ?? item.language ?? ''}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList 
      data={tracks}
      style={{ backgroundColor: colors.black, }}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={(item, index) => `track-${item.track_id ?? item.id ?? item.entity_id}`}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  textContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  itemTitle: {
    color: colors.white,
    fontWeight: 'bold',
  },
  itemSubTitle: {
    color: colors.white,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  }
})