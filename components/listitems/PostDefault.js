import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Card} from 'react-native-elements';
import {uploadsURL} from '../../utils/Variables';

// Layout for posts in the home page
const PostDefault = ({navigation, data}) => {
  return (
    <Card>
      <Card.Title>{data.title}</Card.Title>
      {data.thumbnails != undefined && (
        <Card.Image
          source={{uri: uploadsURL + data.thumbnails.w160}}
        ></Card.Image>
      )}
    </Card>
  );
};

PostDefault.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
};

export default PostDefault;
