import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { PlayerController, PlaylistSelector } from '../../components';
import Icon from '../../lib/Icons';
import styles from './styles';
import { useAppAccessor } from '../../hooks';
import { convertToSSL } from '../../utils';
import { addToFavorite } from './playerView.actions';

export default function MiniPlayer() {

  const [playlistSelector, setPlaylistSelector] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { getCurrentTrack, } = useAppAccessor();
  const currentPlayTrack = getCurrentTrack();

  if (!currentPlayTrack) {
    return null;
  }

  const { artwork_large, artwork_medium, aw, track_title, ti, secondary_language, language, duration, dr, isFavorite = false } = currentPlayTrack;

  return (
    <View style={{flexDirection: 'row', justifyContent: 'center', margin: 10,}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('full-screen-player');
        }}
      >
        <Image 
          source={{ uri: convertToSSL(artwork_large ?? artwork_medium ?? aw ?? '')}}
          style={styles.miniPlayerImage}
          resizeMethod={'resize'}
          resizeMode={'contain'}
        />
      </TouchableOpacity>

      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 10,}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('full-screen-player');
          }}
        >
          <View style={styles.miniPlayerTextContainer}>
            <Text 
              testID={'player-track-title'}
              numberOfLines={1}
              style={styles.miniPlayerItemTitle}>
              {track_title ?? ti ?? ''}
            </Text>
            <Text 
              numberOfLines={1}
              style={styles.miniPlayerItemSubTitle}>
              {secondary_language ?? language ?? ''}
            </Text>
          </View>
        </TouchableOpacity>

        <PlayerController mini={true} />
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