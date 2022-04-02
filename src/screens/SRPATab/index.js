import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TrackList from "./TrackList";
import AlbumList from "./AlbumList";
import ArtistList from "./ArtistList";
import PlayList from "./PlayList";

const Tab = createMaterialTopTabNavigator();

function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1}}
            key={`tab-${label}`}
          >
            <Text style={{
              color: isFocused ? 'white' : 'gray',
              textAlign: 'center',
              fontWeight: 'bold',
              padding: 10
            }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function Searchbar() {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen 
        name="Songs"
        component={TrackList} />
      <Tab.Screen name="Albums" component={AlbumList} />
      <Tab.Screen name="Artists" component={ArtistList} />
      <Tab.Screen name="Playlists" component={PlayList} />
    </Tab.Navigator>
  );
}

export default Searchbar;