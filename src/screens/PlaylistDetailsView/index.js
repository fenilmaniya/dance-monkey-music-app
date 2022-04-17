import React, { useEffect } from 'react';
import { ActivityIndicator, View, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { Header, TrackList } from '../../components';
import { useAppAccessor } from '../../hooks';
import styles from './styles';
import { fetchPlaylistDetails, fetchFavoritePlaylistDetails } from './playlistDetails.actions'

export default function PlaylistDetailsView({ route }) {

  const dispatch = useDispatch();
  const { getCurrentPlaylist, getCurrentPlaylistDetails } = useAppAccessor();
  const currentPlaylistDetails = getCurrentPlaylistDetails();
  const { title, ti, playlist_id, id } = getCurrentPlaylist();

  const { loading, playlistDetail } = currentPlaylistDetails;
  const tracks = playlistDetail?.tracks ?? [];

  useEffect(() => {
    const { type } = route.params; 
    if (type && type === 'my-work') {

      dispatch(fetchFavoritePlaylistDetails(playlist_id));
    } else {
      
      dispatch(fetchPlaylistDetails(playlist_id ?? id));
    }
  }, [])

  return(
    <View style={styles.container}>
      <Header title={title ?? ti} />
     
      <View style={{ flex: 1}}>
        {
          loading && <ActivityIndicator />
        }
        <TrackList {...{tracks}} />
      </View>
    </View>
  )
}