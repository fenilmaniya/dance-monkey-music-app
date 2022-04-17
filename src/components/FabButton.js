import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants';
import Icon from '../lib/Icons';

export default function FabButton() {
  
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.fabContainer}
      onPress={() => {
        navigation.navigate('create-playlist');
      }}
    >
      <Icon name="plus" fill="#fff" height="16" width="16" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  fabContainer: {
    backgroundColor: colors.gray,
    height: 45,
    width: 45,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 20,
  }
})