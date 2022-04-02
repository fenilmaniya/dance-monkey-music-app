import React, { useEffect } from 'react';
import TrackPlayer from 'react-native-track-player';
import {
  SafeAreaView
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/lib/store';
import AppNavigator from './src/navigator/AppNavigator';

export default function App() {

  useEffect(() => {

    TrackPlayer.setupPlayer({})
  }, [])

  return (
    <SafeAreaView style={{ flex: 1}}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaView>
  );
};  
