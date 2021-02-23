import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import PostDefault from './listitems/PostDefault';
import ProfilePost from './listitems/ProfilePost';
import {MainContext} from '../contexts/MainContext';

/*
  This list component can be used when the app needs a list of posts.
  Takes in the media displayed as a parameter mediaArray.
  Builds the layout with the required layout for the posts.
  Takes in layout prop which defines which post layout is used depending on the screen's name
 */
const List = ({navigation, mediaArray, layout, usersFilesOnly}) => {
  const {user} = useContext(MainContext);

  let list;
  if (layout === 'home') {
    list = (
      <FlatList
        data={mediaArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <PostDefault navigation={navigation} data={item} />
        )}
      />
    );
  } else if (layout === 'profile') {
    list = (
      <FlatList
        data={mediaArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ProfilePost
            navigation={navigation}
            data={item}
            isMyFile={item.user_id === user.user_id}
          />
        )}
      />
    );
  }
  return [list];
};

List.propTypes = {
  navigation: PropTypes.object,
  mediaArray: PropTypes.array,
  layout: PropTypes.string,
};

export default List;
