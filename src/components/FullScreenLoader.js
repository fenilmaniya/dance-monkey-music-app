import React from 'react';
import { View, Modal, ActivityIndicator, Text } from 'react-native';
import { colors } from '../constants';

export default function FullScreenLoader({
  visible
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View style={{ 
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
      }}>
        <ActivityIndicator color={colors.white} size={22} />
      </View>
    </Modal>
  )
}