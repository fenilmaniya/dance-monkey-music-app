import React from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { colors } from '../../constants';
import { searchWithQuery } from './HomeView.actions';

export default function Searchbar({ disabled }) {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const _handleTextChange = _.debounce((value) => {
    dispatch(searchWithQuery(value))
  }, 200);

  if (disabled) {
    return (
      <TouchableOpacity
        style={{ ...styles.textInput, }}
        onPress={() => navigation.navigate('search')}
      >
        <Text>Search ... </Text>
      </TouchableOpacity>
    )
  }

  return (
    <TextInput
      testID='search-bar'
      style={styles.textInput}
      placeholder={'Search...'}
      placeholderTextColor={colors.black}
      onChangeText={_handleTextChange}
      autoComplete={'off'}
      editable={!disabled}
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
    height: 30,
  }
})