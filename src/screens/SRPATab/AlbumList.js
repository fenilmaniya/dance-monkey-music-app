import React from 'react';
import { Text, FlatList, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useAppAccessor } from "../../hooks";
import { colors } from '../../constants';
import { convertToSSL } from '../../utils';
import { playTrack } from './SRPATab.actions';

export default function AlbumList() {


  const { getHome }= useAppAccessor();
  const {
    album,
  } = getHome();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // dispatch(playTrack(item))
          //   .then(() => {
          //     navigation.navigate('full-screen-player');
          //   });
        }}
        style={styles.itemContainer}>
        <Image 
          source={{uri: convertToSSL(item.atw)}}
          style={styles.itemImage}
        />
        <View style={styles.textContainer}>
          <Text 
            numberOfLines={1}
            style={styles.itemTitle}>
            {item.title}
          </Text>
          <Text 
            numberOfLines={1}
            style={styles.itemSubTitle}>
            {item.language ?? ''}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList 
      data={album}
      style={{ backgroundColor: colors.black, }}
      renderItem={renderItem}
      keyExtractor={(item, index) => `album-${item.album_id}`}
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