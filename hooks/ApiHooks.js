import {useEffect, useState, useContext} from 'react';
import {appTag, tagURL, mediaURL, loginURL, userURL} from '../utils/Variables';
import {MainContext} from '../contexts/MainContext';

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
  throw new Error(TAG, string);
};

const useLoadMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update} = useContext(MainContext);

  // Fetches a list of posts, then fetch the media for those posts
  const loadMedia = async () => {
    try {
      const postsData = await doFetch(mediaURL + '?limit=10'); // TODO Change to fetch with the appTag

      const media = await Promise.all(
        postsData.map(async (item) => {
          const postFile = await doFetch(mediaURL + item.file_id);
          return postFile;
        })
      );
      setMediaArray(media);
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
      throw new Error('postLogin error: ' + error.message);
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
      throw new Error(e.message);
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
      throw new Error(error.message);
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
      throw new Error(error.message);
    }
  };

  const checkIsUserAvailable = async (username) => {
    try {
      const result = await doFetch(userURL + 'username/' + username);
      return result.available;
    } catch (error) {
      throw new Error('apihooks checkIsUserAvailable', error.message);
    }
  };

  return {postRegister, checkToken, checkIsUserAvailable, getUser};
};

export {useLoadMedia, useLogin, useUser};