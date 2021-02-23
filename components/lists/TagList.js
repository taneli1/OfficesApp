import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import Tag from '../listitems/Tag';
import {StyleSheet} from 'react-native';

const TagList = ({navigation, tags}) => {
  return (
    <FlatList
      scrollEnabled={true}
      contentContainerStyle={s.container}
      horizontal={true}
      data={tags}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <Tag navigation={navigation} string={item} />}
    />
  );
};

TagList.propTypes = {
  navigation: PropTypes.object,
  tags: PropTypes.array,
};

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
});

export default TagList;
