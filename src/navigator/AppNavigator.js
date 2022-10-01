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

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { getApp } = useAppAccessor();
  const { root } = getApp();
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
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