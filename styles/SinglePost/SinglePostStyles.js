import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';

const singlePostStyles = StyleSheet.create({
  bgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    height: Dimensions.get('window').height / 1.8,
    width: '100%',
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    paddingTop: Dimensions.get('window').height / 1.8 - 50,
    marginStart: 10,
    marginEnd: 10,
    overflow: 'visible',
  },
});

export default singlePostStyles;
