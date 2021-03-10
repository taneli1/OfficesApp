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
  videoContainer: {
    marginTop: 60,
    marginBottom: 20,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  backButtonIcon: {
    backgroundColor: Colors.primary,
    borderRadius: 40 / 2,
    elevation: 5,
  },
  postOptionsButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  postDataContainer: {
    paddingTop: Dimensions.get('window').height / 1.8 - 50,
    marginStart: 10,
    marginEnd: 10,
    overflow: 'visible',
  },
  postDataContainerVideo: {
    marginStart: 10,
    marginEnd: 10,
    overflow: 'visible',
  },
  fillerElement: {
    marginTop: Dimensions.get('window').height / 1.8,
  },
  fillerElementVideo: {
    marginTop: '10%',
  },
});

export default singlePostStyles;
