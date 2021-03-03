/* eslint-disable guard-for-in */
import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../styles/Colors';
import {Icon} from 'react-native-elements';
import {Dimens} from '../../styles/Dimens';
import {StyleSheet} from 'react-native';
import {useFavorites} from '../../hooks/ApiHooks';
import {MainContext} from '../../contexts/MainContext';
/*

*/
const Favorite = ({postData}) => {
  const postId = postData.file_id;
  const [favCount, setFavCount] = useState(0);
  const [favStatus, setFavStatus] = useState(false);
  const {getPostFavoriteData, favoriteInteraction} = useFavorites();
  const {user, updtFavorites, setUpdtFavorites} = useContext(MainContext);

  // Gets the data for the post favorite status
  const getSetFavData = async () => {
    const data = await getPostFavoriteData(postId, user.user_id);
    setFavCount(data.likeCount);
    setFavStatus(data.userLiked);
  };

  /*
    Call when interacting with the favorite button.
    Calls the favoriteInteraction() in ApiHooks,
    which likes/dislikes a post
  */
  const interactWithPost = async (postId) => {
    await favoriteInteraction(postId);
    setUpdtFavorites(updtFavorites + 1);
  };

  // Need to load the favorites count when rendering the item for the first time
  useEffect(() => {
    getSetFavData();
  }, [updtFavorites]);

  const interact = async () => {
    await interactWithPost(postId);
    await getSetFavData();
  };

  return (
    <TouchableOpacity onPress={() => interact()}>
      <View style={styles.containerHeart}>
        {favStatus ? (
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
