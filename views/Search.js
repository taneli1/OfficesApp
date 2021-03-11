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
  let media = useLoadMedia();
  const word = route.params.search.search;
  media = media.filter((item) =>
    item.title.toLowerCase().includes(word.toLowerCase())
  );

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <List navigation={navigation} mediaArray={media} layout="search" />
      <StatusBar style="auto" backgroundColor={Colors.darkGreen} />
    </SafeAreaView>
  );
};

Search.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Search;
