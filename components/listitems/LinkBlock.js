import React from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Dimens} from '../../styles/Dimens';
import {Card} from 'react-native-elements';
import {Colors} from '../../styles/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const LinkBlock = ({item}) => {
  return (
    <TouchableOpacity>
      <Card containerStyle={s.container}>
        <Text style={s.item}>ItemName</Text>
        <Text style={s.link}>web.page.com/item/thisone</Text>
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
  items: PropTypes.object,
};

export default LinkBlock;
