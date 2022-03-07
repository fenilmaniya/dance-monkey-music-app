import React from 'react';
import { Text, FlatList, View, StyleSheet, Image } from 'react-native';
import { colors } from '../../../constants';
import { useAppAccessor } from "../../../hooks";
import { convertToSSL } from '../../../utils';

export default function TrackList() {
  
  const { getHome }= useAppAccessor();
  const {
    tracks
  } = getHome();

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image 
          source={{uri: convertToSSL(item.artwork)}}
          style={styles.itemImage}
        />
        <View style={styles.textContainer}>
          <Text 
            numberOfLines={1}
            style={styles.itemTitle}>
            {item.track_title}
          </Text>
          <Text 
            numberOfLines={1}
            style={styles.itemSubTitle}>
            {item.secondary_language}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <FlatList 
      data={tracks}
      renderItem={renderItem}
      keyExtractor={(item, index) => `track-${item.track_id}`}
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