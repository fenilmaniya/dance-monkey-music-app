import React from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useAppAccessor } from '../../hooks';
import Icon from '../../lib/Icons';
import Searchbar from './Searchbar';
import SearchResult from './SearchResult';
import styles from './styles';
import { setCurrentPlaylist } from '../SRPATab/SRPATab.actions';

export default function LoadingView() {
  
  const { getHome }= useAppAccessor();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    loading,
  } = getHome();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
        <Searchbar />
        <TouchableOpacity 
          onPress={async () => {
            dispatch(setCurrentPlaylist({
              title: 'favorites',
              playlist_id: 'favorites'
            }))
            .then(() => {
              navigation.navigate('my-work');
            });
          }}
        >
          <Icon name="add_playlist" fill="#fff" height="18" width="18" />
        </TouchableOpacity> 
      </View>
      <SearchResult />
    </SafeAreaView>
  )
}