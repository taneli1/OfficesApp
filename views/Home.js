import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import List from '../components/List';
import GlobalStyles from '../styles/GlobalStyles';
import PropTypes from 'prop-types';
import {useLoadMedia} from '../hooks/ApiHooks';

const Home = ({navigation}) => {
  const data = useLoadMedia();
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <List navigation={navigation} mediaArray={data} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
