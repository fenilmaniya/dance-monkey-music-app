import React, { useEffect } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { ProgressSlider, PlayerController, Header } from '../../components';
import Icon from '../../lib/Icons';
import styles from './styles';
import { useAppAccessor } from '../../hooks';
import { convertToSSL } from '../../utils';
import { fetchCurrentTrackURL, generatePlayList, addToFavorite } from './playerView.actions';

export default function PlayerView() {

  const dispatch = useDispatch();
  const { getCurrentTrack, getPlayerQueue } = useAppAccessor();
  const currentPlayTrack = getCurrentTrack();
  const playerQueue = getPlayerQueue();
  const { artwork_large, artwork_medium, aw, track_title, ti, secondary_language, language, duration, dr } = currentPlayTrack;

  useEffect(() => {
    dispatch(fetchCurrentTrackURL(currentPlayTrack));
    dispatch(generatePlayList(playerQueue, currentPlayTrack));
  }, []);

  return (
    <View style={styles.container}>
      <Header title={track_title} />
      <View style={{ flex: 1}}>
        <Image 
          source={{ uri: convertToSSL(artwork_large ?? artwork_medium ?? aw ?? '')}}
          style={styles.mainImage}
          resizeMethod={'resize'}
          resizeMode={'contain'}
        />
      </View>
      <View style={{ flex: 1, marginTop: 20}}>

        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.textContainer}>
            <Text 
              numberOfLines={1}
              style={styles.itemTitle}>
              {track_title ?? ti ?? ''}
            </Text>
            <Text 
              numberOfLines={1}
              style={styles.itemSubTitle}>
              {secondary_language ?? language ?? ''}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.buttonContainer}>  
            <Icon name="download" fill="#fff" height="20" width="20" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addToFavorite(currentPlayTrack)}
            style={styles.buttonContainer}>  
            <Icon name="heart_inline" fill="#fff" height="20" width="20" />
          </TouchableOpacity>
        </View>
        <ProgressSlider {...{duration, dr}} />
        <PlayerController />
      </View>
    </View>
  )
}