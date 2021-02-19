import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-native-elements';
import {uploadsURL} from '../../utils/Variables';
import {TouchableOpacity} from 'react-native';

// Layout for posts in the home page
const PostDefault = ({navigation, data}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Single', {data: data});
      }}
    >
      <Card>
        <Card.Title>{data.title}</Card.Title>
        {data.thumbnails != undefined && (
          <Card.Image
            source={{uri: uploadsURL + data.thumbnails.w160}}
          ></Card.Image>
        )}
      </Card>
    </TouchableOpacity>
  );
};

PostDefault.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
};

export default PostDefault;
