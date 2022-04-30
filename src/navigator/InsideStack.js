import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  HomeView,
  PlayerView,
  PlaylistDetailsView,
  AlbumDetailsView,
  ArtistDetailsView,
  MyWorkView,
  CreatePlaylist,
  SongQueueView,
  SearchView,
} from '../screens';

const Stack = createNativeStackNavigator();

export default function InsideStack() {
  return (
    <Stack.Navigator mode='modal'>
			<Stack.Screen name='Home' component={HomeView} options={{ headerShown: false }} />
			<Stack.Screen name='search' component={SearchView} options={{ headerShown: false }} />
			<Stack.Screen name='playlist-details' component={PlaylistDetailsView} options={{ headerShown: false }} />
			<Stack.Screen name='album-details' component={AlbumDetailsView} options={{ headerShown: false }} />
			<Stack.Screen name='artist-details' component={ArtistDetailsView} options={{ headerShown: false }} />
			<Stack.Screen name='full-screen-player' component={PlayerView} options={{ headerShown: false }} />
			<Stack.Screen name='song-queue' component={SongQueueView} options={{ headerShown: false }} />
			<Stack.Screen name='my-work' component={MyWorkView} options={{ headerShown: false }} />
			<Stack.Screen name='create-playlist' component={CreatePlaylist} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
