import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../Colors';

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
    resizeMode: 'contain', // or 'stretch'
  },
  backButtonContainer: {
    alignSelf: 'baseline',
    marginLeft: 15,
    marginTop: 15,
  },
  backButtonIcon: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    elevation: 5,
  },
  postOptionsButtonContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  container: {
    paddingTop: Dimensions.get('window').height / 1.8 - 50,
    marginStart: 10,
    marginEnd: 10,
    overflow: 'visible',
  },
  fillerElement: {
    marginTop: Dimensions.get('window').height / 1.8,
  },
});

export default singlePostStyles;
