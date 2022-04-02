import React, { useEffect } from 'react';
import { ActivityIndicator, View, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { TrackList } from '../../components';
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
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20}}>
        <Image 
          source={{ uri: convertToSSL(artwork)}}
          style={styles.mainImage}
          resizeMethod={'resize'}
          resizeMode={'contain'}
        />
        <View style={styles.textContainer}>
          <Text 
            numberOfLines={1}
            style={styles.itemTitle}>
            {title}
          </Text>
        </View>
      </View>
     
      <View style={{ flex: 1}}>
        {
          loading && <ActivityIndicator />
        }
        <TrackList {...{tracks}} />
      </View>
    </View>
  )
}