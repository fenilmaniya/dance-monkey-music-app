import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useAppAccessor } from '../../hooks';
import Searchbar from './Searchbar';
import SearchResult from './SearchResult';
import styles from './styles';

export default function LoadingView() {
  
  const { getHome }= useAppAccessor();
  const {
    loading,
  } = getHome();

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar />
      <SearchResult />
    </SafeAreaView>
  )
}