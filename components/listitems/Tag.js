import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../styles/Colors';
import {Dimens} from '../../styles/Dimens';
import {useTag} from '../../hooks/ApiHooks';
import {CommonActions} from '@react-navigation/native';

const Tag = ({navigation, tag}) => {
  const {loadTagPosts} = useTag();

  const navigateToTagPosts = async () => {
    const postData = await loadTagPosts(tag);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Discover More',
        params: {
          navigation: navigation,
          data: postData,
        },
      })
    );
  };

  return (
    <View style={s.maincontainer}>
      <TouchableOpacity
        onPress={() => {
          navigateToTagPosts();
        }}
      >
        <Text style={s.tag}>{tag}</Text>
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  maincontainer: {
    alignSelf: 'baseline',
  },
  tag: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    padding: 5,
    borderRadius: 6,
    fontSize: Dimens.fontSizes.textSmall,
    marginLeft: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
});

Tag.propTypes = {
  navigation: PropTypes.object,
  tag: PropTypes.string,
};

export default Tag;
