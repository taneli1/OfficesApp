import List from '../components/lists/List';
import PropTypes from 'prop-types';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import {Colors} from '../styles/Colors';

const DiscoverMore = ({navigation, route}) => {
  const data = route.params;
  const media = data.data;
  const tag = data.title;

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <List
        navigation={navigation}
        mediaArray={media}
        tagTitle={tag}
        layout="discoverMore"
      />
      <StatusBar style="auto" backgroundColor={Colors.darkGreen} />
    </SafeAreaView>
  );
};

DiscoverMore.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default DiscoverMore;
