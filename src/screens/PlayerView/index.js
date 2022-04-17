import React, { useEffect, useState } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { ProgressSlider, PlayerController, Header, PlaylistSelector } from '../../components';
import Icon from '../../lib/Icons';
import styles from './styles';
import { useAppAccessor } from '../../hooks';
import { convertToSSL } from '../../utils';
import { fetchCurrentTrackURL, generatePlayList, addToFavorite } from './playerView.actions';

export default function PlayerView() {

  const [playlistSelector, setPlaylistSelector] = useState(false);

  const dispatch = useDispatch();
  const { getApp, getCurrentTrack, getPlayerQueue } = useAppAccessor();
  const currentPlayTrack = getCurrentTrack();
  const playerQueue = getPlayerQueue();
  const { artwork_large, artwork_medium, aw, track_title, ti, secondary_language, language, duration, dr, isFavorite = false } = currentPlayTrack;

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
              testID={'player-track-title'}
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
            style={styles.buttonContainer}
            onPress={() => {
              setPlaylistSelector(true);
            }}
          >  
            <Icon name="add_playlist" fill="#fff" height="20" width="20" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(addToFavorite(currentPlayTrack, isFavorite))}
            style={styles.buttonContainer}>  
            <Icon name={isFavorite ? 'heart' : 'heart_inline'} fill="#fff" height="20" width="20" />
          </TouchableOpacity>
        </View>
        <ProgressSlider {...{duration, dr}} />
        <PlayerController />
      </View>

      <PlaylistSelector
        visible={playlistSelector}
        track={currentPlayTrack}
        onClose={() => {
          setPlaylistSelector(false);
        }}
      />
    </View>
  )
}