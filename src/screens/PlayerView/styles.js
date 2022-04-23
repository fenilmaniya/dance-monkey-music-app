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
    height: 50,
    width: 50,
    borderRadius: 4,
  },
  miniPlayerTextContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  miniPlayerItemTitle: {
    color: colors.white,
    fontWeight: 'bold',
  },
  miniPlayerItemSubTitle: {
    color: colors.white,
  },
  miniPlayerContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    margin: 10, 
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
  }
});

export default styles;