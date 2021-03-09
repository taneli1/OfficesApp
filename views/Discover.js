import List from '../components/lists/List';
import PropTypes from 'prop-types';
import {useTagsLoadMedia} from '../hooks/TagHooks';
import {MainContext} from '../contexts/MainContext';
import React, {useContext} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import {Colors} from '../styles/Colors';

const Discover = ({navigation}) => {
  const {user} = useContext(MainContext);
  const [data, tagData] = useTagsLoadMedia(user);
  let [data2, tagData2] = useTagsLoadMedia(user);
  /*
  if (tagData != undefined && tagData2 != undefined) {
    while (tagData === tagData2) {
      [data2, tagData2] = useTagsLoadMedia(user);
    }
  }
*/
  let [data3, tagData3] = useTagsLoadMedia(user);
  /*
  if (tagData3 != undefined && tagData2 != undefined && tagData != undefined) {
    while (tagData3 === tagData2 || tagData3 === tagData) {
      [data3, tagData3] = useTagsLoadMedia(user);
    }
  }
*/
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <List
        navigation={navigation}
        mediaArray={data}
        mediaArray2={data2}
        mediaArray3={data3}
        tagTitle={tagData}
        tagTitle2={tagData2}
        tagTitle3={tagData3}
        layout="discover"
      />
      <StatusBar style="auto" backgroundColor={Colors.darkGreen} />
    </SafeAreaView>
  );
};

Discover.propTypes = {
  navigation: PropTypes.object,
};

export default Discover;
