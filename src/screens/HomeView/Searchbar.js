import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { colors } from '../../constants';
import { searchWithQuery } from './HomeView.actions';
import Icon from '../../lib/Icons';

export default function Searchbar({ disabled }) {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const _handleTextChange = _.debounce((value) => {
    dispatch(searchWithQuery(value))
  }, 600);

  if (disabled) {
    return (
      <TouchableOpacity
        style={{ ...styles.textInput, marginLeft: 10,}}
        onPress={() => navigation.navigate('search')}
      >
        <Text>Search ... </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <TouchableOpacity
        testID={'back-button'}
        onPress={() => {
         
          navigation.goBack();
        }}
        style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}
      >
        <Icon name="down" fill="#fff" height="16" width="16" />
      </TouchableOpacity>
      <TextInput
        testID='search-bar'
        style={styles.textInput}
        placeholder={'Search...'}
        placeholderTextColor={colors.black}
        onChangeText={_handleTextChange}
        autoComplete={'off'}
        editable={!disabled}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    color: colors.black,
    backgroundColor: colors.gray,
    marginVertical: 10,
    marginRight: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    height: 30,
  }
})