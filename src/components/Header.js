import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '../lib/Icons';
import { colors } from '../constants';

export default function Header({ title, onBackPress, right, onRightPress }) {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID={'back-button'}
        onPress={() => {
          if (onBackPress) {
            
            onBackPress();
          } else {

            navigation.goBack();
          }
        }}
        style={styles.iconContainer}
      >
        <Icon name="down" fill="#fff" height="16" width="16" />
      </TouchableOpacity>
      <Text 
        style={styles.title}
        numberOfLines={1}
      >{title}</Text>
      {
        right && 
          <TouchableOpacity
            onPress={() => {
              if (onRightPress) {
                onRightPress();
              }
            }}
          >
            {right}
          </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  iconContainer: {
    padding: 10,
  },
  title: {
    flex: 1,
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: 10,
  },
})