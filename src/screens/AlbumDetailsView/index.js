import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Header, TrackList } from '../../components';
import { useAppAccessor } from '../../hooks';
import styles from './styles';
import { fetchAlbumDetails } from './albumDetails.actions'
import MiniPlayer from '../PlayerView/MiniPlayer';

export default function AlbumDetailsView() {

  const dispatch = useDispatch();
  const { getCurrentAlbum, getCurrentAlbumDetails } = useAppAccessor();
  const currentAlbumDetails = getCurrentAlbumDetails();
  const { title, ti, seokey, seo } = getCurrentAlbum();

  const { loading, albumDetail } = currentAlbumDetails;
  const tracks = albumDetail?.tracks ?? [];

  useEffect(() => {
    dispatch(fetchAlbumDetails(seokey ?? seo));
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

      <MiniPlayer />
    </View>
  )
}

