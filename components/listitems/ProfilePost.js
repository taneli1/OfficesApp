import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {Text, Image, Icon} from 'react-native-elements';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {uploadsURL} from '../../utils/Variables';

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
          <View style={styles.likesContainer}>
            <Icon name="heart" type="font-awesome" color="red"></Icon>
            <Text style={styles.likesNumber}>15</Text>
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
    margin: 15,
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
    alignSelf: 'flex-start',
    fontSize: 20,
    textDecorationLine: 'underline',
    padding: 5,
  },
  postDescription: {
    flex: 2,
    width: '75%',
    padding: 5,
  },
  likesContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 5,
    borderRadius: 5,
    elevation: 1,
  },
  likesNumber: {
    padding: 5,
  },
});

ProfilePost.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
};

export default ProfilePost;
