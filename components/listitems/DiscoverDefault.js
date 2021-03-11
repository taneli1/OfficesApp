import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-native-elements';
import {uploadsURL} from '../../utils/Variables';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {bigHeader, headerContainer} from '../../styles/BasicComponents';
import {Colors} from '../../styles/Colors';
import {StyleSheet} from 'react-native';

// Layout for posts in the discover page
const DiscoverDefault = ({navigation, data}) => {
  return (
    <TouchableOpacity
      style={s.container}
      onPress={() => {
        navigation.navigate('Single', {data: data});
      }}
    >
      <View style={[headerContainer, {marginLeft: 8}]}>
        <Text style={[bigHeader, s.hCont]}>{data.title}</Text>
      </View>

      <View style={s.imageContainer}>
        {data.thumbnails != undefined && (
          <Image
            style={s.image}
            source={{uri: uploadsURL + data.thumbnails.w320}}
          ></Image>
        )}
      </View>
    </TouchableOpacity>
  );
};
/*
const s = StyleSheet.create({
  maincontainer: {
    flexDirection: 'row',
    alignSelf: 'baseline',
  },
  tag: {
    flex: 1,
    backgroundColor: Colors.primary,
    color: Colors.white,
    padding: 5,
    borderRadius: 6,
    fontSize: Dimens.fontSizes.textSmall,
    marginLeft: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  button: {
    flex: 1,
    backgroundColor: Colors.primary,
    color: Colors.white,
    padding: 5,
    borderRadius: 6,
    fontSize: Dimens.fontSizes.textSmall,
    marginLeft: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  loginButtonContainer: {
    // flexDirection: 'row',
    // height: '100%',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    // borderWidth: 1,
    // borderRadius: 10,
    // borderColor: 'gray',
    // backgroundColor: 'white',
  },
  hCont: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    fontSize: Dimens.fontSizes.textMedium,
    color: Colors.grey,
    elevation: 1,
    borderColor: 'rgba(255, 255, 255, 0.0)',
    borderWidth: 0.0,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 1,
  },
});
*/
DiscoverDefault.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
};

const s = StyleSheet.create({
  imageContainer: {elevation: 10},
  container: {
    width: 200,
    marginTop: 15,
    marginLeft: 15,
  },
  hCont: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    fontSize: 12,
    color: Colors.grey,
    borderColor: 'rgba(255, 255, 255, 0.0)',
    elevation: 1,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 1,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
});

export default DiscoverDefault;
