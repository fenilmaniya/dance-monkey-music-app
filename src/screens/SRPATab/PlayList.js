import React from 'react';
import { Text, FlatList, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useAppAccessor } from "../../hooks";
import { colors } from '../../constants';
import { convertToSSL } from '../../utils';
import { setCurrentPlaylist } from './SRPATab.actions';
import { NoResultFound } from '../../components';

export default function PlayList() {


  const { getHome } = useAppAccessor();
  const {
    loading,
    playlist,
  } = getHome();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(setCurrentPlaylist(item))
            .then(() => {
              navigation.navigate('playlist-details');
            });
        }}
        style={styles.itemContainer}>
        <Image 
          source={{uri: convertToSSL(item.artwork)}}
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
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <>
      { (!loading && (playlist ?? []).length===0 )&& <NoResultFound /> }
      <FlatList 
        data={playlist}
        style={{ backgroundColor: colors.black, }}
        renderItem={renderItem}
        keyExtractor={(item, index) => `playlist-${item.playlist_id}`}
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