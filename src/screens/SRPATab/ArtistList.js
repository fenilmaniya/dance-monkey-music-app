import React from 'react';
import { Text, FlatList, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useAppAccessor } from "../../hooks";
import { colors } from '../../constants';
import { convertToSSL } from '../../utils';
import { setCurrentArtist } from './SRPATab.actions';
import { NoResultFound } from '../../components';

export default function TrackList() {

  const { getHome }= useAppAccessor();
  const {
    loading,
    artist
  } = getHome();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(setCurrentArtist(item))
            .then(() => {
              navigation.navigate('artist-details');
            });
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
            {item.name}
          </Text>
          <Text 
            numberOfLines={1}
            style={styles.itemSubTitle}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <>
      { (!loading && (artist ?? []).length===0 )&& <NoResultFound /> }
      <FlatList 
        data={artist}
        style={{ backgroundColor: colors.black, }}
        renderItem={renderItem}
        keyExtractor={(item, index) => `artist-${item.artist_id}`}
      />
    </>
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