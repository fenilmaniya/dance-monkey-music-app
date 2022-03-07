import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../constants';
import { fetchConstants } from './loadingView.actions';

export default function LoadingView() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConstants());
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red
  },
  mainText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  }
})