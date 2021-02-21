import React from 'react';
import {FlatList} from 'react-native';
import LinkBlock from '../listitems/LinkBlock';
import PropTypes from 'prop-types';

const LinkList = ({items}) => {
  return (
    <FlatList
      scrollEnabled={true}
      data={items}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <LinkBlock item={item} />}
    />
  );
};

LinkList.propTypes = {
  items: PropTypes.array,
};

export default LinkList;
