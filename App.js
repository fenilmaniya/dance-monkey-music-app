import React, { useEffect } from 'react';
import TrackPlayer, { Capability } from 'react-native-track-player';
import {
  SafeAreaView
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/lib/store';
import AppNavigator from './src/navigator/AppNavigator';

import {
  PlayButton,
  PauseButton,
  NextButton,
  PreviousButton,
  NotificationIcon,
} from './src/constants/images';

export default function App() {

  useEffect(() => {

    TrackPlayer.setupPlayer({});

    TrackPlayer.updateOptions({
      stopWithApp: true,
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
      playIcon: PlayButton,
      pauseIcon: PauseButton,
      previousIcon: NextButton,
      nextIcon: PreviousButton,
      icon: NotificationIcon,
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
