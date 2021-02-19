import React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import PostDefault from './listitems/PostDefault';

/*
  This list component can be used when the app needs a list of posts.
  Takes in the media displayed as a parameter mediaArray.
  Builds the layout with the required layout for the posts.

  For now, uses only PostDefault for all layouts

  TODO
    Implement logic to choose a layout for the posts based on what is needed.
 */
const List = ({navigation, mediaArray}) => {
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <PostDefault navigation={navigation} data={item} />
      )}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  mediaArray: PropTypes.array,
};

export default List;
