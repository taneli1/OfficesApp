import {useEffect, useState, useContext} from 'react';
import {appTag, tagURL, mediaURL, loginURL, userURL} from '../utils/Variables';
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
      const media = await Promise.all(
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

  const uploadPost = async (image, inputs) => {
    const axios = require('axios').default;
    const userToken = await AsyncStorage.getItem('userToken');
    const filename = image.split('/').pop();

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
    let ok = false;
    try {
      await axios(options).then((res) => {
        if (res.status == 201) {
          console.log('Upload res ok: ', res.data.file_id);
          addTag(res.data.file_id);
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

  const addTag = async (fileId) => {
    console.log('AddTag Called, fileId: ', fileId);
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
        tag: appTag,
      },
    };

    try {
      await axios(options).then((res) => {
        if (res.status == 201) console.log('Tag added to post');
        else console.log(res);
      });
    } catch (error) {
      throwErr('addTag error:', error);
    }
  };

  return {getByTag, uploadPost};
};

export {useLoadMedia, useLogin, useUser, useTag};
