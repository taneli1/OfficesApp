import {StyleSheet, Platform, StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
export default StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
