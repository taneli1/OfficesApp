/* eslint-disable guard-for-in */
import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../styles/Colors';
import {Icon} from 'react-native-elements';
import {Dimens} from '../../styles/Dimens';
import {StyleSheet} from 'react-native';
import favoriteManager from '../../utils/FavoriteManager';

// Parameter object postData, get favorites count with that
const Favorite = ({postData}) => {
  const {
    interactWithPost,
    getPostFavCount,
    getPostFavoriteStatus,
  } = favoriteManager();
  const [favCount, setFavCount] = useState(0);

  const interact = async () => {
    await interactWithPost(postData.file_id);
    await getFavCount();
  };

  const getFavCount = async () => {
    setFavCount(await getPostFavCount(postData.file_id));
  };

  // Need to load the favorites count when rendering the item for the first time
  const willMount = useRef(true);
  if (willMount.current) {
    getFavCount();
    willMount.current = false;
  }

  return (
    <TouchableOpacity onPress={() => interact()}>
      <View style={styles.containerHeart}>
        {getPostFavoriteStatus(postData.file_id) ? (
          <Icon color={Colors.red} name="favorite"></Icon>
        ) : (
          <Icon color={Colors.red} name="favorite-border"></Icon>
        )}
        <Text style={styles.hearts}>{favCount}</Text>
      </View>
    </TouchableOpacity>
  );
};

Favorite.propTypes = {
  postData: PropTypes.object,
};

const styles = StyleSheet.create({
  hearts: {
    fontSize: Dimens.fontSizes.textMedium,
    alignSelf: 'baseline',
    marginLeft: 5,
  },
  containerHeart: {
    flexDirection: 'row',
    padding: 4,
  },
});

export default Favorite;
