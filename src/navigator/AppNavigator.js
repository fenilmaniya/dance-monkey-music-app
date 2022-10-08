import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InsideStack from './InsideStack';

import { RootEnum } from '../definitions';
import { 
  LoadingView
} from '../screens';
import { useAppAccessor } from '../hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setCurrentScreen } from '../lib/log';
import { getActiveRouteName } from '../lib/navigation';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { getApp } = useAppAccessor();
  const { root } = getApp();
  const navigationRef = React.createRef();
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer
      
        onStateChange={state => {
          const previousRouteName = navigationRef.current;
          const currentRouteName = getActiveRouteName(state);
          if (previousRouteName !== currentRouteName) {
            setCurrentScreen(currentRouteName);
          }
          navigationRef.current = currentRouteName;
        }}
      >
        <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
          <>
            {root === RootEnum.ROOT_LOADING ? <Stack.Screen name='Loading' component={LoadingView} /> : null}
            {root === RootEnum.ROOT_INSIDE && <Stack.Screen name='InsideStack' component={InsideStack} />}
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}