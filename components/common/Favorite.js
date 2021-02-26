/* eslint-disable guard-for-in */
import React, {useContext, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../styles/Colors';
import {Icon} from 'react-native-elements';
import {Dimens} from '../../styles/Dimens';
import {StyleSheet} from 'react-native';
import {MainContext} from '../../contexts/MainContext';
import {useFavorites} from '../../hooks/ApiHooks';

// Parameter object postData, get favorites count with that
const Favorite = ({postData}) => {
  const {userFavorites, setUserFavorites} = useContext(MainContext);
  const {
    favoriteInteraction,
    getUserFavorites,
    getPostFavoriteCount,
  } = useFavorites();
  const [favoriteStatus, setFavoriteStatus] = useState(false);
  const [favCount, setFavCount] = useState(0);

  // Call when favorite functionality is clicked
  const favInteraction = async (postId) => {
    await favoriteInteraction(postId);
    await updateUserFavorites();
    await updatePostStatus(postId);
  };

  const updatePostStatus = async (postId) => {
    console.log('updatePostStatus called');
    if (userFavorites.includes(postId)) setFavoriteStatus(true);
    else setFavoriteStatus(false);
    setFavCount(await getPostFavoriteCount(postData.file_id));
  };

  const updateUserFavorites = async () => {
    const favorites = await getUserFavorites();
    for (const i in favorites) {
      const temp = [];
      temp.push(favorites[i].file_id);
      setUserFavorites(temp);
    }
    console.log('userFavorites array set to: ', userFavorites);
  };

  // Update post status on first render
  const willMount = useRef(true);
  if (willMount.current) {
    updatePostStatus(postData.file_id);
    willMount.current = false;
  }

  return (
    <TouchableOpacity onPress={() => favInteraction(postData.file_id)}>
      <View style={styles.containerHeart}>
        {favoriteStatus == true ? (
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
