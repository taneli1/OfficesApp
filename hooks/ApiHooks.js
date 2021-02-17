import {useEffect, useState, useContext} from 'react';
import {appTag, tagURL, mediaURL} from '../utils/Variables';
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

export {useLoadMedia};
