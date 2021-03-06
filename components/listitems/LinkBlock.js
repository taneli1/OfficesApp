import React from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Dimens} from '../../styles/Dimens';
import {Card} from 'react-native-elements';
import {Colors} from '../../styles/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Linking} from 'react-native';

const LinkBlock = ({item}) => {
  return (
    <TouchableOpacity
      onPress={() => Linking.openURL('https://' + item.itemLink)}
    >
      <Card containerStyle={s.container}>
        <Text style={s.item}>{item.itemName}</Text>
        <Text style={s.link}>{item.itemLink}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 5,
    borderColor: Colors.primary,
    borderWidth: 0.8,
  },
  item: {
    fontSize: Dimens.fontSizes.textSmall,
    alignSelf: 'center',
    color: Colors.primary,
  },
  link: {
    fontSize: Dimens.fontSizes.textSmaller,
    alignSelf: 'center',
    color: Colors.grey,
  },
});

LinkBlock.propTypes = {
  item: PropTypes.object,
};

export default LinkBlock;
