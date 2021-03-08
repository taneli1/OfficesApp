import List from '../components/lists/List';
import PropTypes from 'prop-types';
import {useTagsLoadMediaMore} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import React, {useContext} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import {Colors} from '../styles/Colors';

const DiscoverMore = ({navigation}) => {
  const {user} = useContext(MainContext);
  const data = useTagsLoadMediaMore(tag);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <List navigation={navigation} mediaArray={data} layout="discoverMore" />
      <StatusBar style="auto" backgroundColor={Colors.darkGreen} />
    </SafeAreaView>
  );
};

DiscoverMore.propTypes = {
  navigation: PropTypes.object,
};

export default DiscoverMore;
