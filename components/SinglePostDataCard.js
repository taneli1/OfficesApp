import React from 'react';
import PropTypes from 'prop-types';
import {Card, Text} from 'react-native-elements';
import {View} from 'react-native';
import {
  bigHeader,
  headerContainer,
  cardLayout,
} from '../styles/BasicComponents';

const SinglePostDataCard = ({postData}) => {
  return (
    <View>
      <View style={headerContainer}>
        <Text style={bigHeader}>{postData.title}</Text>
      </View>

      <Card containerStyle={cardLayout}>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
        <Text>{postData.description}</Text>
      </Card>
    </View>
  );
};

SinglePostDataCard.propTypes = {
  postData: PropTypes.object,
};

export default SinglePostDataCard;
