import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  HomeView
} from '../screens';

const Stack = createNativeStackNavigator();

export default function InsideStack() {
  return (
    <Stack.Navigator mode='modal'>
			<Stack.Screen name='Home' component={HomeView} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}