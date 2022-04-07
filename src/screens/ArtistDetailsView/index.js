import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Header, TrackList } from '../../components';
import { useAppAccessor } from '../../hooks';
import styles from './styles';
import { fetchArtistDetails } from './artistDetails.actions'

export default function ArtistDetailsView() {

  const dispatch = useDispatch();
  const { getCurrentArtist, getCurrentArtistDetails } = useAppAccessor();
  const currentArtistDetails = getCurrentArtistDetails();
  const { name, seokey } = getCurrentArtist();

  const { loading, artistDetail } = currentArtistDetails;
  const tracks = artistDetail?.section_data[0]?.entities_repo?.entities ?? [];

  console.log(currentArtistDetails);

  useEffect(() => {
    dispatch(fetchArtistDetails(seokey));
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
    </View>
  )
}