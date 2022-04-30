import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchMyWork, addTrackToPlaylist } from '../screens/MyWorkView/myWork.actions';
import { colors } from '../constants';
import { useAppAccessor } from '../hooks';
import Header from './Header';
import getTrackId from '../utils/getTrackId';

export default function MyPlaylist({ selector = false, onClose, track }) {

  const [selectedItems, setSelectedItems] = useState([]);

  const { getMyWork } = useAppAccessor();
  const {
    playlist,
  } = getMyWork();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyWork());
  }, [])

  useEffect(() => {
    if (!selector) {
      return;
    }

    const newSelectedItem = [];
    playlist.map(p => {
      // console.log(p.tracks.find(t => getTrackId(t) === getTrackId(track)));
      if (p.tracks.find(t => getTrackId(t) === getTrackId(track))) {
        newSelectedItem.push(p.playlist_id);
      }

      console.log(newSelectedItem);
    });

    setSelectedItems(newSelectedItem);
  }, [playlist])

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        testID={`playlist-${index}`}
        style={[
          styles.itemContainer,
          selectedItems.includes(item.playlist_id) && {
            backgroundColor: colors.gray,
            borderRadius: 10,
          }
        ]}
        onPress={() => {
          if (selector) {

            setSelectedItems(selectedItems => {
              if (selectedItems.includes(item.playlist_id)) {
  
                return selectedItems.filter(selectedItem => selectedItem!=item.playlist_id);
              } else {
                
                return [...selectedItems, item.playlist_id];
              }
            })
          }
        }}
      >
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
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1}}>
      { selector && <Header title={'select playlist ... '} onBackPress={() => onClose()} />}
      <FlatList 
        data={playlist}
        style={{ backgroundColor: colors.black, }}
        renderItem={renderItem}
        testID={'play-list'}
        keyExtractor={(item, index) => `playlist-${item.playlist_id ?? item.id}`}
      />
      { selector && <TouchableOpacity 
        style={styles.addButton}
        onPress={() => {
          dispatch(addTrackToPlaylist(selectedItems, track));
          onClose();
        }}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity> }
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
    margin: 2,
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
  addButton: {
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  addButtonText: {
    color: colors.black,
    fontWeight: 'bold',
    paddingVertical: 10,
  }
})