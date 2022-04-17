import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../constants';

const ScreenWidth = Dimensions.get('window').width;
const SliderWidth = ScreenWidth * 0.82;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 20,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    color: colors.white,
    fontWeight: 'bold',
  },
  itemSubTitle: {
    color: colors.white,
  },
  buttonContainer: {
    padding: 10,
  },

  // mini player
  miniPlayerImage: {
    height: 40,
    width: 40,
  },
  miniPlayerTextContainer: {
    flex: 1,
  },
  miniPlayerItemTitle: {
    color: colors.white,
    fontWeight: 'bold',
  },
  miniPlayerItemSubTitle: {
    color: colors.white,
  },
});

export default styles;