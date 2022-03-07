import React from 'react';
import {
  SafeAreaView
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/lib/store';
import AppNavigator from './src/navigator/AppNavigator';

export default function App() {

  return (
    <SafeAreaView style={{ flex: 1}}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaView>
  );
};  
