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
  // console.log('discover more tag', tag);
  // console.log('discover more data', data);
  // console.log('discover more media', data);
  // const {user} = useContext(MainContext);

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
