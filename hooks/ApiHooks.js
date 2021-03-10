/* eslint-disable valid-jsdoc */
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
  commentURL,
} from '../utils/Variables';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {getRandomTag} from '../components/functional/TagSelector';

const TAG = 'ApiHooks: ';
// let randomTag = '';

const doFetch = async (url, options = {}) => {
  const res = await fetch(url, options);
  const json = await res.json();
  if (json.errors) throwErr('doFetch err: ' + json.message + '|' + json.error);
  else if (!res.ok) throwErr('doFetch failed: res not ok: ', res);
  else return json;
};

// Throwing errors with the tag
const throwErr = (string) => {
  throw new Error(TAG + ' ' + string);
};

const useSearchTitle = (string) => {
  const [mediaArray, setMediaArray] = useState([]);
  /** *
   * TODO update cannot be used in search/UseTagsMedia
   * The update = useState(0) from mainContext cant be used
   * for multiple components. The update value is used for home screen posts,
   * and should only be used for those.
   *
   * If the same update hook is used in multiple funcions useEffect() methods
   * all of these fuctions get called whenever the update receives any state
   * changes. This causes all kinds of problems:
   *
   * 1. We update stuff that is not required / rendered -> Performance issues
   * 2. We try to access stuff that is not initialized yet, which causes yet more problems
   * 3. This creates cycles, which again try to access uninitialized fields
   * */
  const {update} = useContext(MainContext);

  const searchTitle = async () => {
    try {
      const postsData = await doFetch(tagURL + appTag);
      let media = await Promise.all(
        postsData.map(async (item) => {
          const postFile = await doFetch(mediaURL + item.file_id);
          return postFile;
        })
      );
      media = media.filter(media.title.includes(string));
      setMediaArray(media.reverse());
    } catch (e) {
      throwErr('loadMedia err: ', e.message);
    }
  };
  useEffect(() => {
    searchTitle();
  }, [update]);
  return mediaArray;
};

// Makes a MediaArray of a random tag for discover page
const useTagsLoadMedia = (user) => {
  const [mediaArray, setMediaArray] = useState([]);
  const [tagTitle, setTagTitle] = useState();
  const {update} = useContext(MainContext);

  const tagloadMedia = async () => {
    try {
      const tag = ''; //getRandomTag();
      const postsData = await doFetch(tagURL + appTag + tag);
      const media = await Promise.all(
        postsData.map(async (item) => {
          const postFile = await doFetch(mediaURL + item.file_id);
          return postFile;
        })
      );
      setMediaArray(media.reverse());
      setTagTitle(tag);
    } catch (e) {
      throwErr('loadMedia err: ', e.message);
    }
  };
  useEffect(() => {
    tagloadMedia();
  }, [update]);

  return [mediaArray, tagTitle];
};

const useLoadMedia = (usersPostsOnly, userId, tagPostsOnly) => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update} = useContext(MainContext);

  // Fetches a list of posts, then fetch the media for those posts
  const loadMedia = async () => {
    console.log('loadMedia, updateCalled');
    try {
      const postsData = await doFetch(tagURL + appTag);
      let media = await Promise.all(
        postsData.map(async (item) => {
          const postFile = await doFetch(mediaURL + item.file_id);
          return postFile;
        })
      );
      console.log('media test', media[0].title);
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

const loadTagPosts = async (tagName) => {
    try {
      const postsData = await doFetch(tagURL + appTag + tagName);
      const media = await Promise.all(
        postsData.map(async (item) => {
          const postFile = await doFetch(mediaURL + item.file_id);
          return postFile;
        })
      );
    } catch (e) {
      throwErr('loadMedia err: ', e.message);
    }
  };
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

/**
 * @see Variables for explanation
 */
const useTag = () => {
  const getByTag = async (tag) => {
    try {
      const fileList = await doFetch(tagURL + tag);
      return fileList;
    } catch (e) {
      throwErr(e.message);
    }
  };

  /**
   Uploads the post itself, and calls the required functions for the tag posting.

   The function takes in a tagArray, which contains the user created tags as strings.
   these tags are created in @see TagSelector

   All posts get the default appTag, and all the strings in tagArray gets added
   to the post as tags.

   Any new tags in the tagArray are saved to a hidden post, which
   contains all the user created tags in the app.
   */
  const uploadPost = async (image, inputs, tagArray, descriptionObject) => {
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
    formData.append('description', JSON.stringify(descriptionObject));

    console.log('formdata : ', formData);
    const options = {
      url: mediaURL,
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
        'x-access-token': userToken,
      },
      data: formData,
    };

    console.log('options: ', options);

    try {
      await axios(options).then(async (res) => {
        if (res.status == 201) {
          console.log('Upload res ok: ', res.data.file_id);
          // Add the main tag for app
          await addTag(res.data.file_id, '');
          // Add extra tags user has created
          for (const i in tagArray) {
            const thisTag = tagArray[i];
            await addTag(res.data.file_id, thisTag);
            // If the tag is new, also save it to the hidden post
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
      console.log('uploaderror: ', error);
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

  const getTagsForPost = async (postId) => {
    const options = {
      method: 'GET',
    };
    try {
      const res = await doFetch(tagURL + 'file/' + postId, options);
      const tagList = res.filter((it) => it.tag !== appTag); // Drop the main app tag
      const tagArray = [];
      for (const i in tagList) {
        const thisTag = tagList[i].tag.split('_').pop();
        tagArray.push(thisTag);
      }

      return tagArray;
    } catch (e) {
      throwErr(e.message);
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

  // Uploads a new avatar picture and adds an avatar tag to it.
  const uploadAvatarPicture = async (image, userId) => {
    const axios = require('axios').default;
    const userToken = await AsyncStorage.getItem('userToken');
    const filename = image.split('/').pop();
    let ok = false;

    const formData = new FormData();
    // Add a title to formData
    formData.append('title', 'Profile picture');

    // Infer the type of the image
    const match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    if (type === 'image/jpg') type = 'image/jpeg';

    // Add the image to formData
    formData.append('file', {uri: image, name: filename, type});

    const options = {
      url: mediaURL,
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
        'x-access-token': userToken,
      },
      data: formData,
    };

    let fileId;
    try {
      await axios(options).then((res) => {
        if (res.status == 201) {
          fileId = res.data.file_id;
          console.log('Upload res ok: ', fileId);
          ok = true;
        } else {
          console.log('err Upload: ', res.status, res.message);
        }
      });
    } catch (error) {
      console.log('uploaderror: ', error.message);
    }
    // Add the avatar tag
    await addTag(fileId, 'avatar_' + userId);
    return ok;
  };

  return {
    getByTag,
    uploadPost,
    getAllTags,
    getTagsForPost,
    uploadAvatarPicture,
  };
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
      return res;
    } catch (error) {
      console.log('getUserFavorites err: ', error);
    }
  };

  /*
    Return the amount of likes of the post and a boolean value whether
    the passed in user has liked the post in question

    returns { likeCount: number, userLiked: boolean }
  */
  const getPostFavoriteData = async (postId, userId) => {
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

      let userLikedPost = false;
      // Loop the response and check if the logged in user has liked the post
      if (userId != undefined && userId != null) {
        for (const i in postFavorites) {
          if (postFavorites[i].user_id == userId) {
            userLikedPost = true;
            break;
          }
        }
      }
      return {likeCount: postFavorites.length, userLiked: userLikedPost};
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
        async (res) => {
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
            console.log('Unfavoriting post...');
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

  return {favoriteInteraction, getUserFavorites, getPostFavoriteData};
};

const useComments = () => {
  const getPostComments = async (postId) => {
    const options = {
      method: 'GET',
    };
    try {
      const res = await doFetch(commentURL + 'file/' + postId, options);
      console.log('Comment response: ', res);
      return res;
    } catch (e) {
      throwErr(e.message);
    }
  };

  const postComment = async (string, postId) => {
    const userToken = await AsyncStorage.getItem('userToken');
    const axios = require('axios').default;

    const options = {
      url: commentURL,
      method: 'POST',
      headers: {
        'x-access-token': userToken,
      },
      data: {
        file_id: postId,
        comment: string,
      },
    };
    try {
      await axios(options).then(
        (res) => {
          if (res.status == 201) console.log('Comment ok');
          else console.log('Comment res not ok');
        },
        (error) => {
          console.log('Axios comment post failure : ', error);
        }
      );
    } catch (error) {
      throwErr('unFavorite error: ', error);
    }
  };

  const deleteComment = async (commentId) => {
    const userToken = await AsyncStorage.getItem('userToken');
    const axios = require('axios').default;

    const options = {
      url: commentURL + commentId,
      method: 'DELETE',
      headers: {
        'x-access-token': userToken,
      },
    };

    let ok = false;
    try {
      await axios(options).then(
        (res) => {
          if (res.status === 200) {
            ok = true;
          } else console.log('Response was not 200, but: ', res);
        },
        (err) => {
          console.log('Something went wrong deleting comment: ', err);
        }
      );
    } catch (err) {
      console.log('Error deleting comment: ', err);
    }
    return ok;
  };

  return {getPostComments, postComment, deleteComment};
};

const useMedia = () => {
  const updateFile = async (fileId, fileInfo, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(fileInfo),
    };
    try {
      const result = await doFetch(mediaURL + fileId, options);
      return result;
    } catch (error) {
      throw new Error('updateFile error: ' + error.message);
    }
  };

  const deleteFile = async (fileId, token) => {
    const options = {
      method: 'DELETE',
      headers: {'x-access-token': token},
    };
    try {
      const result = await doFetch(mediaURL + fileId, options);
      return result;
    } catch (error) {
      throw new Error('deleteFile error: ' + error.message);
    }
  };

  return {updateFile, deleteFile};
};

export {
  useLoadMedia,
  useTagsLoadMedia,
  useSearchTitle,
  useLogin,
  useUser,
  useTag,
  useFavorites,
  useComments,
  useMedia,
};
