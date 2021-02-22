import React from 'react';
import {FlatList} from 'react-native';
import CommentBlock from '../listitems/CommentBlock';
import PropTypes from 'prop-types';

const CommentList = ({navigation, comments}) => {
  return (
    <FlatList
      style={{marginTop: 20}}
      scrollEnabled={true}
      data={comments}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <CommentBlock data={item} />}
    />
  );
};

CommentList.propTypes = {
  navigation: PropTypes.object,
  comments: PropTypes.array,
};

export default CommentList;
