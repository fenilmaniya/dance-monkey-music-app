import React from "react";
import { View, Text, StyleSheet, FlatList,} from "react-native";
import TrackList from "./SearchResult/TrackList";

export default function Searchbar({
}) {

  return (
    <View>
      <TrackList />
    </View>
  )
}

const styles = StyleSheet.create({
})