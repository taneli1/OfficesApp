import React from 'react';
import {ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import SinglePost from '../components/SinglePostDataCard';
import singlePostStyles from '../styles/SinglePost/SinglePostStyles';
import {uploadsURL} from '../utils/Variables';
import {View} from 'react-native';
import {ImageBackground} from 'react-native';
import {Dimensions} from 'react-native';

const Single = ({route}) => {
  const {data} = route.params;

  return (
    <View style={{flex: 1}}>
      <View style={singlePostStyles.bgContainer}>
        <ImageBackground
          style={singlePostStyles.bgImage}
          source={{uri: uploadsURL + data.filename}}
        />
      </View>

      <ScrollView
        style={singlePostStyles.container}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <SinglePost
          style={singlePostStyles.postData}
          postData={data}
        ></SinglePost>
        {/* This makes the content scrollable all the way to the bottom*/}
        <View style={{marginTop: Dimensions.get('window').height / 1.8}}></View>
      </ScrollView>
    </View>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};
export default Single;
