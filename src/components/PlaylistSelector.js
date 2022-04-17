import React from 'react';
import { View, Modal, StyleSheet,  } from 'react-native';
import { colors } from '../constants';
import MyPlaylist from './MyPlaylist';

export default function PlaylistSelector({ visible, onClose, track }) {
  return (
    
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <MyPlaylist selector={true} {...{onClose, track}} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  modalView: {
    height: '60%',
    width: '100%',
    backgroundColor: colors.black,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})