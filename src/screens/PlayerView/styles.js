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
    flex: 1,
  },
  textContainer: {
    paddingHorizontal: 10,
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
});

export default styles;