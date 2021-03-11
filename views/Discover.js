import List from '../components/lists/List';
import PropTypes from 'prop-types';
import {useTagsLoadMedia} from '../hooks/TagHooks';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import {Colors} from '../styles/Colors';

const Discover = ({navigation}) => {
  const [data, tagData] = useTagsLoadMedia();

  const [data2, tagData2] = useTagsLoadMedia();
  /*
  if (tagData != undefined && tagData2 != undefined) {
    while (tagData === tagData2) {
      console.log('while loop called');
      [data2, tagData2] = useTagsLoadMedia();
    }
  }
*/
  const [data3, tagData3] = useTagsLoadMedia();

  /*
  if (tagData3 != undefined && tagData2 != undefined && tagData != undefined) {
    while (tagData3 === tagData2 || tagData3 === tagData) {
      console.log('while loop called');
      [data3, tagData3] = useTagsLoadMedia();
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
