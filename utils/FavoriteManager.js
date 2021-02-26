/* eslint-disable guard-for-in */
import {useState} from 'react';
import {useFavorites} from '../hooks/ApiHooks';

let userFavorites = [];

const favoriteManager = () => {
  const [isDataSynced, setIsDataSynced] = useState(false);
  const {
    favoriteInteraction,
    getUserFavorites,
    getPostFavoriteCount,
  } = useFavorites();

  // Call when favorite functionality is clicked
  const interactWithPost = async (postId) => {
    setIsDataSynced(false);
    await favoriteInteraction(postId);
    await updateUserFavorites();
    setIsDataSynced(true);
  };

  const getPostFavoriteStatus = (postId) => {
    return userFavorites.includes(postId);
  };

  // Updates the users
  const updateUserFavorites = async () => {
    const favorites = await getUserFavorites(); // Returns an array of objects
    const temp = [];
    for (const i in favorites) {
      temp.push(favorites[i].file_id);
    }
    userFavorites = temp;
    console.log('UpdatedFavorites: ', userFavorites);
  };

  const getPostFavCount = async (postId) => {
    return await getPostFavoriteCount(postId);
  };

  return {interactWithPost, getPostFavoriteStatus, getPostFavCount};
};

export default favoriteManager;
