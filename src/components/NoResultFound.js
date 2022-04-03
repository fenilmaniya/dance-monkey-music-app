import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants';

export default function NoResultFound() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.black, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ color: 'white', fontWeight: 'bold'}}>No Result Found!</Text>
    </View>
  )
}