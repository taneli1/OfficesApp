import List from '../components/lists/List';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import React, {useContext} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import {Colors} from '../styles/Colors';

const DiscoverMore = ({navigation, route}) => {
  const data = route.params;
  const media = data.data;
  console.log('discover more data', data);
  // const {user} = useContext(MainContext);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <List
        navigation={navigation}
        mediaArray={media}
        // tagTitle={tagData}
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
