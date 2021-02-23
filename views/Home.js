import React, {useContext} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import List from '../components/lists/List';
import GlobalStyles from '../styles/GlobalStyles';
import PropTypes from 'prop-types';
import {useLoadMedia} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const Home = ({navigation}) => {
  const usersPostsOnly = false;
  const {user} = useContext(MainContext);
  const data = useLoadMedia(usersPostsOnly, user.user_id);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <List navigation={navigation} mediaArray={data} layout="home" />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
