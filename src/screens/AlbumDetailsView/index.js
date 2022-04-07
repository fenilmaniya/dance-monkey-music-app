import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Header, TrackList } from '../../components';
import { useAppAccessor } from '../../hooks';
import styles from './styles';
import { fetchAlbumDetails } from './albumDetails.actions'

export default function AlbumDetailsView() {

  const dispatch = useDispatch();
  const { getCurrentAlbum, getCurrentAlbumDetails } = useAppAccessor();
  const currentAlbumDetails = getCurrentAlbumDetails();
  const { title, seokey } = getCurrentAlbum();

  const { loading, albumDetail } = currentAlbumDetails;
  const tracks = albumDetail?.tracks ?? [];

  useEffect(() => {
    dispatch(fetchAlbumDetails(seokey));
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