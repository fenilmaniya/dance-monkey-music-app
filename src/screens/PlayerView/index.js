import React, { useEffect } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { ProgressSlider, PlayerController } from '../../components';
import styles from './styles';
import { useAppAccessor } from '../../hooks';
import { convertToSSL } from '../../utils';
import { fetchCurrentTrackURL } from './playerView.actions';

export default function PlayerView() {

  const dispatch = useDispatch();
  const { getCurrentTrack } = useAppAccessor();
  const currentPlayTrack = getCurrentTrack();
  const { artwork_large, track_title, secondary_language, duration } = currentPlayTrack;

  useEffect(() => {
    dispatch(fetchCurrentTrackURL(currentPlayTrack));
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: convertToSSL(artwork_large)}}
        style={styles.mainImage}
        resizeMethod={'resize'}
        resizeMode={'contain'}
      />
      <View style={{ flex: 1}}>

        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20}}>
          <View style={styles.textContainer}>
            <Text 
              numberOfLines={1}
              style={styles.itemTitle}>
              {track_title}
            </Text>
            <Text 
              numberOfLines={1}
              style={styles.itemSubTitle}>
              {secondary_language}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.buttonContainer}>
            <Text style={{ color: 'white'}}>Download</Text>
          </TouchableOpacity>
        </View>
        <ProgressSlider {...{duration}} />
        <PlayerController />
      </View>
    </View>
  )
}