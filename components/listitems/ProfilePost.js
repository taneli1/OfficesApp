import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {Text, Image} from 'react-native-elements';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {uploadsURL} from '../../utils/Variables';
import Favorite from '../common/Favorite';

const ProfilePost = ({navigation, data}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Single', {data: data});
      }}
    >
      <View style={styles.usersPostCard}>
        <Image
          source={{uri: uploadsURL + data.thumbnails.w160}}
          style={styles.postImage}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.postTextContainer}>
          <Text style={styles.postTitle}>{data.title}</Text>
          <Text style={styles.postDescription}>{data.description}</Text>
          <View style={styles.favoriteContainer}>
            <Favorite postData={data}></Favorite>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
  postImage: {
    justifyContent: 'flex-start',
    width: 190,
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
  favoriteContainer: {
    alignSelf: 'flex-end',
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
});

ProfilePost.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
};

export default ProfilePost;
