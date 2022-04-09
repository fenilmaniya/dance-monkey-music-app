import React from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { colors } from '../../constants';
import { searchWithQuery } from './HomeView.actions';

export default function Searchbar() {

  const dispatch = useDispatch();

  const _handleTextChange = _.debounce((value) => {
    dispatch(searchWithQuery(value))
  }, 200)

  return (
    <TextInput
      testID='search-bar'
      style={styles.textInput}
      placeholder={'Search...'}
      placeholderTextColor={colors.black}
      onChangeText={_handleTextChange}
      autoComplete={'off'}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    color: colors.black,
    backgroundColor: colors.gray,
    margin: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  }
})