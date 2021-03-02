import List from '../components/lists/List';
import PropTypes from 'prop-types';
import {useLoadMedia} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import React, {useContext} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

const Discover = ({navigation}) => {
  const usersPostsOnly = false;
  const {user} = useContext(MainContext);
  const data = useLoadMedia(usersPostsOnly, user.user_id);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <List navigation={navigation} mediaArray={data} layout="discover" />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

Discover.propTypes = {
  navigation: PropTypes.object,
};

export default Discover;
