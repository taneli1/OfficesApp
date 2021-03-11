import List from '../components/lists/List';
import PropTypes from 'prop-types';
import {useTagsLoadMedia} from '../hooks/TagHooks';
import {MainContext} from '../contexts/MainContext';
import React, {useContext} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import {Colors} from '../styles/Colors';
import {View} from 'react-native';
import useSearch from '../hooks/SearchHooks';
import {useSearchTitle} from '../hooks/ApiHooks';
import {useLoadMedia} from '../hooks/ApiHooks';

const Search = ({navigation, route}) => {
  const {inputs, handleInputChange} = useSearch();
  let media = useLoadMedia();
  // const media = useSearchTitle();
  // console.log('search media', media);
  // inputs.search = 'k';

  media = media.filter((item) => item.title.includes(inputs.search));
  console.log('search inputs.search', inputs.search);
  console.log('search media2 ', media);

  // const mediaSearch = media.filter(media.title.includes('a'));
  // const mediaSearch = useSearchTitle();
  // const {inputs, handleInputChange} = useSearch();
  // console.log('search 1', route);
  // const getData = route.params;
  // console.log('search 2', getData);
  // const media = getData.data;
  // console.log('search media', media);
  // const mediaSearch = media.filter(media.title.includes(inputs));
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <List
        navigation={navigation}
        mediaArray={media}
        // tagTitle={tag}
        layout="search"
      />
      <StatusBar style="auto" backgroundColor={Colors.darkGreen} />
    </SafeAreaView>
  );
};

Search.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Search;
