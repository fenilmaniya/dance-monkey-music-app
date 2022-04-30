import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../constants';
import { createPlaylist } from './createplaylist.actions';
import { Header, MyPlaylist } from '../../components';

export default function CreatePlaylist() {

  const [playlistName, setPlaylistName] = useState();

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Header title={'Create Playlist'} />
      <TextInput
        testID='create-playlist-name'
        style={styles.textInput}
        placeholder={'playlist name'}
        placeholderTextColor={colors.black}
        autoComplete={'off'}
        onChangeText={text => setPlaylistName(text)}
      />
      <TouchableOpacity 
        style={styles.createuButton}
        onPress={() => dispatch(createPlaylist(playlistName))}
      >
        <Text style={styles.createButtonText}>Create</Text>
      </TouchableOpacity>
      <MyPlaylist />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 10,
  },
  textInput: {
    color: colors.black,
    backgroundColor: colors.gray,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  createuButton: {
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  createButtonText: {
    color: colors.black,
    fontWeight: 'bold',
    paddingVertical: 10,
  }
})