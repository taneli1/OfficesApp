import {useEffect, useState, useContext} from 'react';
import {appTag, tagURL, mediaURL} from '../utils/Variables';
import {MainContext} from '../contexts/MainContext';
import {doFetch} from '../hooks/ApiHooks';
import {getRandomTag} from '../components/functional/TagSelector';

// Makes a MediaArray of a random tag for discover page
const useTagsLoadMedia = (user) => {
  const [mediaArray, setMediaArray] = useState([]);
  const [tagTitle, setTagTitle] = useState();
  const {update} = useContext(MainContext);

  const tagLoadMedia = async () => {
    try {
      const tag = getRandomTag();
      const postsData = await doFetch(tagURL + appTag + tag);
      const media = await Promise.all(
        postsData.map(async (item) => {
          const postFile = await doFetch(mediaURL + item.file_id);
          return postFile;
        })
      );
      setMediaArray(media.reverse());
      setTagTitle(tag);
    } catch (error) {
      console.log('tagLoadMedia error', error);
    }
  };
  useEffect(() => {
    tagLoadMedia();
  }, [update]);

  return [mediaArray, tagTitle];
};

export {useTagsLoadMedia};
