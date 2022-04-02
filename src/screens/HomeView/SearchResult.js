import React from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useAppAccessor } from "../../hooks";
import { colors } from "../../constants";
import SRPATab  from '../SRPATab';

export default function Searchbar() {

  const { getHome }= useAppAccessor();
  const {
    loading,
    tracks,
    album,
    artist
  } = getHome();

  return (
    <View style={{ flex: 1 }}>
      { loading && <ActivityIndicator color={colors.white} size={22} />}
      { tracks
        ? <SRPATab />
        : tracks?.length === 0 && album?.length === 0 && artist?.length === 0
          ? <Text>No Result found</Text>
          : <View />
      }
    </View>
  )
}

const styles = StyleSheet.create({
})