import React from 'react';
import {FlatList} from 'react-native';
import CommentBlock from '../listitems/CommentBlock';
import PropTypes from 'prop-types';

// Pass all the comment data fetched
const CommentList = ({navigation, commentData}) => {
  return (
    <FlatList
      style={{marginTop: 20}}
      scrollEnabled={true}
      data={commentData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <CommentBlock navigation={navigation} data={item} />
      )}
    />
  );
};

CommentList.propTypes = {
  navigation: PropTypes.object,
  commentData: PropTypes.array,
};

export default CommentList;
