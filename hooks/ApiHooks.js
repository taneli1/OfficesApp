/* eslint-disable guard-for-in */
import {useEffect, useState, useContext} from 'react';
import {
  appTag,
  tagURL,
  mediaURL,
  loginURL,
  userURL,
  allTagsId,
  favoriteURL,
} from '../utils/Variables';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TAG = 'ApiHooks: ';

const doFetch = async (url, options = {}) => {
  const res = await fetch(url, options);
  const json = await res.json();
  if (json.errors) throwErr('doFetch err: ' + json.message + '|' + json.error);
  else if (!res.ok) throwErr('doFetch failed: res not ok');
  else return json;
};

// Throwing errors with the tag
const throwErr = (string) => {
  throw new Error(TAG + ' ' + string);
};

const useLoadMedia = (usersPostsOnly, userId) => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update} = useContext(MainContext);

  // Fetches a list of posts, then fetch the media for those posts
  const loadMedia = async () => {
    try {
      const postsData = await doFetch(tagURL + appTag);
      let media = await Promise.all(
        postsData.map(async (item) => {
          const postFile = await doFetch(mediaURL + item.file_id);
          return postFile;
        })
      );
      if (usersPostsOnly) {
        media = media.filter((item) => item.user_id === userId);
      }
      setMediaArray(media.reverse());
    } catch (e) {
      throwErr('loadMedia err: ', e.message);
    }
  };
  useEffect(() => {
    loadMedia();
  }, [update]);
  return mediaArray;
};

const useLogin = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userCredentials),
    };
    try {
      const userData = await doFetch(loginURL, options);
      return userData;
    } catch (error) {
      throwErr('postLogin error: ' + error.message);
    }
  };

  return {postLogin};
};

const useUser = () => {
  const postRegister = async (inputs) => {
    console.log('trying to create user', inputs);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const json = await doFetch(userURL, fetchOptions);
      console.log('register resp', json);
      return json;
    } catch (e) {
      throwErr(e.message);
    }
  };

  const checkToken = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const userData = await doFetch(userURL + '/user', options);
      return userData;
    } catch (error) {
      throwErr(error.message);
    }
  };

  const getUser = async (id, token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const userData = await doFetch(userURL + id, options);
      return userData;
    } catch (error) {
      throwErr(error.message);
    }
  };

  const checkIsUserAvailable = async (username) => {
    try {
      const result = await doFetch(userURL + 'username/' + username);
      return result.available;
    } catch (error) {
      throwErr('apihooks checkIsUserAvailable', error.message);
    }
  };

  return {postRegister, checkToken, checkIsUserAvailable, getUser};
};

const useTag = () => {
  const getByTag = async (tag) => {
    try {
      const fileList = await doFetch(tagURL + tag);
      return fileList;
    } catch (e) {
      throwErr(e.message);
    }
  };

  /*
   Uploads the post itself, and calls the required functions for the tag posting.
   All posts get the default appTag, and all the strings in tagArray gets added
   to the post as tags. Also handles the stuff for new tag posting
   */
  const uploadPost = async (image, inputs, tagArray) => {
    const axios = require('axios').default;
    const userToken = await AsyncStorage.getItem('userToken');
    const filename = image.split('/').pop();
    const oldTags = await getAllTags();
    let ok = false;

    // Infer the type of the image
    const match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    if (type === 'image/jpg') type = 'image/jpeg';

    const formData = new FormData();
    formData.append('file', {uri: image, name: filename, type});
    formData.append('title', inputs.title);
    formData.append('description', inputs.description);

    const options = {
      url: mediaURL,
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
        'x-access-token': userToken,
      },
      data: formData,
    };

    try {
      await axios(options).then((res) => {
        if (res.status == 201) {
          console.log('Upload res ok: ', res.data.file_id);
          // Add the main tag for app
          addTag(res.data.file_id, '');
          // Add extra tags
          for (const i in tagArray) {
            const thisTag = tagArray[i];
            addTag(res.data.file_id, thisTag);
            if (!oldTags.includes(thisTag)) {
              saveNewTag(thisTag);
            }
          }
          ok = true;
        } else {
          console.log('err Upload: ', res.status, res.message);
        }
      });
    } catch (error) {
      console.log('uploaderror: ', error.message);
    }
    return ok;
  };

  const addTag = async (fileId, tagValue) => {
    console.log('AddTag Called, fileId: ', fileId + 'tagValue:', tagValue);
    const userToken = await AsyncStorage.getItem('userToken');
    const axios = require('axios').default;

    const options = {
      url: tagURL,
      method: 'POST',
      headers: {
        'x-access-token': userToken,
      },
      data: {
        file_id: fileId,
        tag: appTag + tagValue,
      },
    };

    try {
      await axios(options).then((res) => {
        if (res.status == 201) console.log('Tag added to post');
        else console.log(res);
      });
    } catch (error) {
      throwErr('addTag error:', error.message);
    }
  };

  /*
    Fetches all the tags under allTagsId post, and returns the tags from it
    These are the user created tags in the application
   */
  const getAllTags = async () => {
    console.log('getAllTags Called');
    const userToken = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'GET',
      headers: {'x-access-token': userToken},
    };
    try {
      const res = await doFetch(tagURL + 'file/' + allTagsId, options);
      const tagList = res.filter((it) => it.tag !== appTag + '_all_tag_values'); // TODO Remove this tag
      const tagArray = [];

      for (const i in tagList) {
        const thisTag = tagList[i].tag.split('_').pop();
        tagArray.push(thisTag);
      }
      console.log('Existing TagArray: ', tagArray);
      return tagArray;
    } catch (e) {
      throwErr(e.message);
    }
  };

  // Saves a new tag to the allTagsId
  const saveNewTag = async (tag) => {
    try {
      addTag(allTagsId, tag);
      console.log('NewTag added: ', tag);
    } catch (error) {
      console.log('saveNewTag Error: ', error.message);
    }
  };

  return {getByTag, uploadPost, getAllTags};
};

// Methods for favorites
const useFavorites = () => {
  const getUserFavorites = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'GET',
      headers: {'x-access-token': userToken},
    };

    try {
      const res = await doFetch(favoriteURL, options);
      console.log('UserFavorites response : ', res);
      return res;
    } catch (error) {
      console.log('getUserFavorites err: ', error);
    }
  };

  const getPostFavoriteCount = async (postId) => {
    const options = {
      method: 'GET',
      data: {
        id: postId,
      },
    };
    try {
      const postFavorites = await doFetch(
        favoriteURL + 'file/' + postId,
        options
      );
      console.log('FavCountRes: ', postFavorites.length);
      return postFavorites.length;
    } catch (error) {
      console.log('GetPostFavCount err: ', error);
    }
  };

  // Favorites a post, or unfavorites it if it's favorited by the user already
  const favoriteInteraction = async (postId) => {
    const userToken = await AsyncStorage.getItem('userToken');
    const axios = require('axios').default;

    const options = {
      url: favoriteURL,
      method: 'POST',
      headers: {
        'x-access-token': userToken,
      },
      data: {
        file_id: postId,
      },
    };

    try {
      await axios(options).then(
        (res) => {
          if (res.status == 201) console.log('Favorited post');
          else console.log('favoritePost: response not 201: ', res);
        },
        async (error) => {
          /*
           Error 400 here (bad request). Request itself should always be fine, so we can expect
           that the failure was due to the post having a favorite already with the current
           user. => UserInteraction also unfavorites posts, so call unFavorite() here
          */
          if (error == 'Error: Request failed with status code 400') {
            await unFavoritePost(postId);
          } else console.log('axios postFav err: ', error);
        }
      );
    } catch (error) {
      throwErr('favoriteInteraction error:', error.message);
    }
  };

  const unFavoritePost = async (postId) => {
    const userToken = await AsyncStorage.getItem('userToken');
    const axios = require('axios').default;

    const options = {
      url: favoriteURL + 'file/' + postId,
      method: 'DELETE',
      headers: {
        'x-access-token': userToken,
      },
    };

    try {
      await axios(options).then(
        (res) => {
          if (res.status == 200) console.log('Unfavorited post');
          else console.log('Could not unfavorite post');
        },
        (error) => {
          console.log('axios unFavorite error: ', error);
        }
      );
    } catch (error) {
      throwErr('unFavorite error: ', error);
    }
  };

  return {favoriteInteraction, getUserFavorites, getPostFavoriteCount};
};

export {useLoadMedia, useLogin, useUser, useTag, useFavorites};
