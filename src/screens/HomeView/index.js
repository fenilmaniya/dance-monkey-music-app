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

export default function LoadingView() {
  
  const { getHome }= useAppAccessor();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { dashboard } = getHome();
  const { loading, smart_feeds, smartFeedLoading, smartFeedPage } = dashboard;

  useEffect(() => {

    dispatch(fetchDashboardData());
  }, []);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
        <Searchbar disabled={true} />
        <TouchableOpacity 
          style={{ paddingHorizontal: 4 }}
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

        <TouchableOpacity
          style={{ paddingHorizontal: 4 }}
          onPress={async () => {
            dispatch(fetchDashboardData())
          }}
        >
          <Icon name="refresh" fill="#fff" height="16" width="16" />
        </TouchableOpacity> 
      </View>

      { (loading && smartFeedPage<=0) && <ActivityIndicator color={colors.white} size={22} /> }
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={10}
        bounces={false}
        scrollEnabled={true}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent) && !loading) {
            dispatch(fetchDashboardData());
          }
        }}
      >
        {
          smart_feeds.map((smart_feed, index) => (
            <View key={`smart-feed-item-${index}`}>
              <Text style={styles.smart_feed_title}>{smart_feed.title}</Text>
              <TrackList 
                tracks={smart_feed.entities}
                horizontal={true}
                type={smart_feed.type}
              />
            </View>
          ))
        }
        { (loading && smartFeedPage>1) && <ActivityIndicator color={colors.white} size={22} /> }
      </ScrollView>

      <MiniPlayer />
    </SafeAreaView>
  )
}