import React, { useEffect } from 'react';
import TrackPlayer, { Capability } from 'react-native-track-player';
import {
  SafeAreaView
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/lib/store';
import AppNavigator from './src/navigator/AppNavigator';

export default function App() {

  useEffect(() => {

    TrackPlayer.setupPlayer({});

    TrackPlayer.updateOptions({
      // Media controls capabilities
      capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
      ],
  
      // Capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [Capability.Play, Capability.Pause],
  
      // Icons for the notification on Android (if you don't like the default ones)
      playIcon: require('./src/assets/icons/play-icon.png'),
      pauseIcon: require('./src/assets/icons/pause-icon.png'),
      previousIcon: require('./src/assets/icons/previous-icon.png'),
      nextIcon: require('./src/assets/icons/next-icon.png'),
      icon: require('./src/assets/icons/notification-icon.png')
  });
  }, [])

  return (
    <SafeAreaView style={{ flex: 1}}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaView>
  );
};  
