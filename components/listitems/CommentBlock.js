import React from 'react';
import {View, Text} from 'react-native';
import ProfileContainer from '../common/ProfileContainer';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Dimens} from '../../styles/Dimens';

// 
const CommentBlock = ({navigation, data}) => {
  return (
    <View style={s.container}>
      <ProfileContainer
        style={s.profile}
        navigation={navigation}
        userData={null}
      />
      <Text style={s.text}>A nice looking office!</Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    marginLeft: 0,
    flexDirection: 'row',
    transform: [{scaleX: 0.85}, {scaleY: 0.85}, {translateX: -16}],
  },
  profile: {
    alignSelf: 'center',
  },
  text: {
    marginLeft: 8,
    flex: 1,
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
});

CommentBlock.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
};

export default CommentBlock;