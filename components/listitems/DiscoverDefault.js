import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-native-elements';
import {uploadsURL} from '../../utils/Variables';
import {TouchableOpacity} from 'react-native';
import {cardLayout, bigHeader} from '../../styles/BasicComponents';
import {Colors} from '../../styles/Colors';
import {Dimens} from '../../styles/Dimens';
import {StyleSheet} from 'react-native';

// Layout for posts in the discover page
const DiscoverDefault = ({navigation, data}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Single', {data: data});
      }}
    >
      <Card containerStyle={[cardLayout, {width: 200}]}>
        <Card.Title style={[bigHeader, s.hCont]}>{data.title}</Card.Title>
        {data.thumbnails != undefined && (
          <Card.Image
            source={{uri: uploadsURL + data.thumbnails.w160}}
          ></Card.Image>
        )}
      </Card>
    </TouchableOpacity>
  );
};

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

DiscoverDefault.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
};

export default DiscoverDefault;
