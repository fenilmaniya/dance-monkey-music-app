import { StyleSheet } from 'react-native';
import { colors } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black
  },
  smart_feed_title: {
    color: colors.white,
    margin: 10,
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default styles;