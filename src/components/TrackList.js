import React from 'react';
import { Text, FlatList, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useAppAccessor } from '../hooks';
import { colors } from '../constants';
import { convertToSSL } from '../utils';
import { playTrack, setCurrentPlaylist } from '../screens/SRPATab/SRPATab.actions';
import {
  ADD_TO_PLAYER_QEUEUE
} from '../screens/PlayerView/playerView.actionTypes';
import getTrackId from '../utils/getTrackId';

export default function TrackList({ tracks, fromSearch, horizontal, type }) {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { getCurrentTrack } = useAppAccessor();
  const currentPlayTrack = getCurrentTrack();
  const currentTrackId = getTrackId(currentPlayTrack);

  const renderHorizontalItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        testID={`track-${index}`}
        onPress={() => {
          console.log('click', `track-${index}`);
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
            style={[
              styles.itemTitle,
              currentTrackId === getTrackId(item) && { color: '#f2c039'}
            ]}>
            {item.track_title ?? item.name ?? item.ti ?? ''}
          </Text>
          <Text 
            numberOfLines={1}
            style={[
              styles.itemSubTitle,
              currentTrackId === getTrackId(item) && { color: '#f2c039'}
            ]}>
            {item.secondary_language ?? item.language ?? ''}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderVerticalItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        testID={`track-${index}`}
        onPress={() => {
          if (!fromSearch) {
            dispatch({
              type: ADD_TO_PLAYER_QEUEUE,
              payload: tracks,
            })
          }

          if (type === 'PL') {
            dispatch(setCurrentPlaylist(item))
              .then(() => {
                navigation.navigate('playlist-details');
              });
          }
        }}
        style={styles.itemVerticalContainer}>
        <Image 
          source={{uri: convertToSSL(item.artwork ?? item.aw ?? '')}}
          style={styles.verticalItemImage}
        />
        <View style={styles.verticalTextContainer}>
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

  const renderItem = ({ item, index }) => {

    if (horizontal) {
      return renderVerticalItem({ item, index });
    }

    return renderHorizontalItem({ item, index });
  }

  return (
    <FlatList 
      data={tracks}
      style={{ backgroundColor: colors.black,}}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      testID={'track-list'}
      keyExtractor={(item, index) => `track-${item.track_id ?? item.id ?? item.entity_id}`}
      horizontal={horizontal}
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
  },


  // vertical
  itemVerticalContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    width: 120,
  },
  verticalTextContainer: {
    flex: 1,
  },
  itemTitle: {
    color: colors.white,
    fontWeight: 'bold',
  },
  itemSubTitle: {
    color: colors.white,
  },
  verticalItemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
})
