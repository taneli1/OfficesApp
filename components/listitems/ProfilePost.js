import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {Text, Image} from 'react-native-elements';
import {uploadsURL} from '../../utils/Variables';
import Favorite from '../common/Favorite';
import {Colors} from '../../styles/Colors';
import TagList from '../lists/TagList';
import {useTag} from '../../hooks/ApiHooks';

const ProfilePost = ({navigation, data}) => {
  const descriptionData = JSON.parse(data.description);
  const postDescription = descriptionData[0];

  let title = data.title;
  if (title.length > 15) {
    title = title.substr(0, 15) + '...';
  }

  let description = postDescription;
  if (description.length > 45) {
    description = description.substr(0, 45) + '...';
  }

  const [postTags, setPostTags] = useState([]);
  const {getTagsForPost} = useTag();
  const [refresh, setRefresh] = useState([]);

  const fetchTags = async () => {
    const res = await getTagsForPost(data.file_id);
    setPostTags(res);
  };

  useEffect(() => {
    fetchTags();
  }, [refresh]);

  return (
    <View style={styles.usersPostCard}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('Single', {data: data});
          }}
        >
          <Image
            source={{uri: uploadsURL + data.thumbnails.w160}}
            style={styles.postImage}
            resizeMode="contain"
            PlaceholderContent={
              <ActivityIndicator size="large" color={Colors.primary} />
            }
          />
        </TouchableOpacity>
      </View>
      <View style={styles.postTextContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('Single', {data: data});
          }}
        >
          <Text style={styles.postTitle}>{title}</Text>
          <Text style={styles.postDescription}>{description}</Text>
        </TouchableOpacity>
        <View style={styles.tagsAndFavoriteContainer}>
          <View style={styles.tagsContainer}>
            <TagList tags={postTags} navigation={navigation} />
          </View>
          <View style={styles.favoriteContainer}>
            <Favorite postData={data}></Favorite>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  usersPostCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    backgroundColor: 'white',
    margin: 10,
  },
  imageContainer: {
    flex: 1,
  },
  postImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 4 / 3,
  },
  postTextContainer: {
    flex: 1,
  },
  postTitle: {
    flex: 1,
    fontSize: 20,
    textDecorationLine: 'underline',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  postDescription: {
    flex: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  tagsAndFavoriteContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  tagsContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
  },
  favoriteContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
    alignItems: 'center',
  },
});

ProfilePost.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
};

export default ProfilePost;
