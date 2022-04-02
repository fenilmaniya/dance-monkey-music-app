import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
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
      <Image 
        source={require('../../assets/images/dance_monkey.png')} 
        style={{ width: 120, height: 120, borderRadius: 4 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
})