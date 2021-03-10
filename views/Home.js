import React, {useContext, useEffect} from 'react';
import {
  LogBox,
  SafeAreaView,
  StatusBar,
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import List from '../components/lists/List';
import GlobalStyles from '../styles/GlobalStyles';
import PropTypes from 'prop-types';
import {useLoadMedia} from '../hooks/ApiHooks';
import {Colors} from '../styles/Colors';
import {MainContext} from '../contexts/MainContext';

const Home = ({navigation}) => {
  const data = useLoadMedia();
  const {update} = useContext(MainContext);

  useEffect(() => {
    notifyMessage('Posts updated!');
  }, [update]);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <List navigation={navigation} mediaArray={data} layout="home" />

      <StatusBar style="auto" backgroundColor={Colors.darkGreen} />
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

const notifyMessage = (msg) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    AlertIOS.alert(msg);
  }
};

/*
  Disables a warning which comes from passing a data from Tag.js -> "Discover More" with navigation
  push action, and providing a non-serializable value in the props.
 */
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state', // TODO: Remove when fixed
]);

export default Home;
