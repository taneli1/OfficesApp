import {useEffect, useState, useContext} from 'react';
import {appTag, tagURL, mediaURL} from '../utils/Variables';
import {MainContext} from '../contexts/MainContext';
import {doFetch, useTag} from '../hooks/ApiHooks';
import {allTagsId} from '../utils/Variables';

// import {getRandomTag} from '../components/functional/TagSelector';

const getRandomTag = async () => {
  const {getAllTags} = useTag();
  const tags = await getAllTags();
  // console.log('tagHooks getRandomTag alltags', tags);
  const randomTag = tags[Math.floor(Math.random() * tags.length)];
  // console.log('tagHooks getRandomTag randomTag', randomTag);
  const result = randomTag;
  return result;
};

// Makes a MediaArray of a random tag for discover page
const useTagsLoadMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [tagTitle, setTagTitle] = useState();
  const {updateDisc} = useContext(MainContext);

  const tagLoadMedia = async () => {
    try {
      const tag = await getRandomTag();
      // tag = tag.toString();
      // console.log('tagLoadMedia tag to string', tag);
      const postsData = await doFetch(tagURL + appTag + tag);
      const filtered = postsData.filter(
        (post) => post.file_id !== parseInt(allTagsId)
      );
      const media = await Promise.all(
        filtered.map(async (item) => {
          const postFile = await doFetch(mediaURL + item.file_id);
          return postFile;
        })
      );
      // console.log('tagLoadMedia media', media);
      setMediaArray(media.reverse());
      setTagTitle(tag);
    } catch (error) {
      console.log('tagLoadMedia error', error);
    }
  };
  useEffect(() => {
    tagLoadMedia();
  }, [updateDisc]);

  return [mediaArray, tagTitle];
};

export {useTagsLoadMedia};
