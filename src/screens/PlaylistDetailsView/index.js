import React, { useEffect } from 'react';
import { ActivityIndicator, View, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { Header, TrackList } from '../../components';
import { useAppAccessor } from '../../hooks';
import styles from './styles';
import { fetchPlaylistDetails, fetchFavoritePlaylistDetails } from './playlistDetails.actions'
import MiniPlayer from '../PlayerView/MiniPlayer';
import getPlaylistId from '../../utils/getPlaylistId';
import getPlaylistName from '../../utils/getPlaylistName';

export default function PlaylistDetailsView({ route }) {

  const dispatch = useDispatch();
  const { getCurrentPlaylist, getCurrentPlaylistDetails } = useAppAccessor();
  const currentPlaylistDetails = getCurrentPlaylistDetails();
  const currentPlaylist = getCurrentPlaylist();
  const name = getPlaylistName(currentPlaylist);

  const { loading, playlistDetail } = currentPlaylistDetails;
  const tracks = playlistDetail?.tracks ?? [];

  useEffect(() => {
    const type = route.params?.type; 
    if (type && type === 'my-work') {

      dispatch(fetchFavoritePlaylistDetails(getPlaylistId(currentPlaylist)));
    } else {

      dispatch(fetchPlaylistDetails(getPlaylistId(currentPlaylist)));
    }
  }, [])

  return(
    <View style={styles.container}>
      <Header title={name} />
     
      <View style={{ flex: 1}}>
        {
          loading && <ActivityIndicator />
        }
        <TrackList {...{tracks}} />
      </View>

      <MiniPlayer />
    </View>
  )
}