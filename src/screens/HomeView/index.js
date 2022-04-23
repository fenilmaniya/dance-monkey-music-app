import React, { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useAppAccessor } from '../../hooks';
import Icon from '../../lib/Icons';
import Searchbar from './Searchbar';
import { colors } from '../../constants';
import SearchResult from './SearchResult';
import styles from './styles';
import { setCurrentPlaylist } from '../SRPATab/SRPATab.actions';
import { fetchDashboardData } from './HomeView.actions';
import MiniPlayer from '../PlayerView/MiniPlayer';
import { TrackList } from '../../components';
import PlayList from '../SRPATab/PlayList';

export default function LoadingView() {
  
  const { getHome }= useAppAccessor();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { dashboard } = getHome();
  const { loading, smart_feeds } = dashboard;

  useEffect(() => {

    dispatch(fetchDashboardData());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
        <Searchbar disabled={true} />
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

      { loading && <ActivityIndicator color={colors.white} size={22} /> }
      <ScrollView>
        {
          smart_feeds.map(smart_feed => (
            <View>
              <Text style={styles.smart_feed_title}>{smart_feed.entityDescription}</Text>
              <TrackList 
                tracks={smart_feed.entities}
                horizontal={true}
                type={smart_feed.type}
              />
            </View>
          ))
        }
      </ScrollView>

      <MiniPlayer />
    </SafeAreaView>
  )
}