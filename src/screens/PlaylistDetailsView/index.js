import React, { useEffect } from 'react';
import { ActivityIndicator, View, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { Header, TrackList } from '../../components';
import { useAppAccessor } from '../../hooks';
import styles from './styles';
import { fetchPlaylistDetails } from './playlistDetails.actions'

export default function PlaylistDetailsView() {

  const dispatch = useDispatch();
  const { getCurrentPlaylist, getCurrentPlaylistDetails } = useAppAccessor();
  const currentPlaylistDetails = getCurrentPlaylistDetails();
  const { title, artwork, playlist_id } = getCurrentPlaylist();

  const { loading, playlistDetail } = currentPlaylistDetails;
  const tracks = playlistDetail?.tracks ?? [];

  useEffect(() => {
    dispatch(fetchPlaylistDetails(playlist_id));
  }, [])

  return(
    <View style={styles.container}>
      <Header title={title} />
     
      <View style={{ flex: 1}}>
        {
          loading && <ActivityIndicator />
        }
        <TrackList {...{tracks}} />
      </View>
    </View>
  )
}