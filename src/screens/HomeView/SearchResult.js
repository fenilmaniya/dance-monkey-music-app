import React from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useAppAccessor } from "../../hooks";
import { colors } from "../../constants";
import SRPATab  from '../SRPATab';

export default function Searchbar() {

  const { getHome }= useAppAccessor();
  const {
    loading,
  } = getHome();

  return (
    <View style={{ flex: 1 }}>
      { loading && <ActivityIndicator color={colors.white} size={22} />}
      <SRPATab />
    </View>
  )
}

const styles = StyleSheet.create({
})