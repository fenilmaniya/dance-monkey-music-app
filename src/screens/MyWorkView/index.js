import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchMyWork, deletePlaylist } from './myWork.actions';
import { colors } from '../../constants';
import { useAppAccessor } from '../../hooks';
import { NoResultFound } from '../../components';
import { setCurrentPlaylist } from '../SRPATab/SRPATab.actions';
import { Header, FabButton } from '../../components';
import Icon from '../../lib/Icons';

export default function MyWorkView() {

  const { getMyWork } = useAppAccessor();
  const {
    playlist,
  } = getMyWork();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchMyWork());
  }, [])

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        testID={`playlist-${index}`}
        onPress={() => {
          dispatch(setCurrentPlaylist({
            title: item.title,
            playlist_id: item.playlist_id
          }))
            .then(() => {
              navigation.navigate('playlist-details', {
                type: 'my-work'
              });
            });
        }}
        style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <Text 
            numberOfLines={1}
            style={styles.itemTitle}>
            {item.title ?? item.ti ?? ''}
          </Text>
          <Text 
            numberOfLines={1}
            style={styles.itemSubTitle}>
            {item.title ?? item.ti ?? ''}
          </Text>
        </View>
        <TouchableOpacity onPress={() => dispatch(deletePlaylist(item.playlist_id))}>
          <Icon name="delete" fill={'#fff'} height={20} width={20} />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Header title={'My Work'} />
      { (playlist ?? []).length===0 && <NoResultFound /> }
      <FlatList 
        data={playlist}
        style={{ backgroundColor: colors.black, }}
        renderItem={renderItem}
        testID={'play-list'}
        keyExtractor={(item, index) => `playlist-${item.playlist_id ?? item.id}`}
      />
      <FabButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 20,
  },
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