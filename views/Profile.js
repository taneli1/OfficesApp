import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Text, ListItem, Avatar, Image} from 'react-native-elements';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/Variables';
import {ScrollView} from 'react-native-gesture-handler';
import {View} from 'react-native';
import {bigHeader, headerContainer} from '../styles/BasicComponents';
import {Colors} from '../styles/Colors';

const Profile = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getFilesByTag} = useTag();

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatarList = await getFilesByTag('avatar_' + user.user_id);
        if (avatarList.length > 0) {
          setAvatar(uploadsUrl + avatarList.pop().filename);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAvatar();
  }, []);

  return (
    <ScrollView>
      <View style={styles.userInfoContainer}>
        <Image
          source={{uri: avatar}}
          style={styles.profileImage}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.userTextContainer}>
          <View style={headerContainer}>
            <Text style={[bigHeader, {marginTop: 70, marginBottom: 20}]}>
              {user.username}
            </Text>
          </View>
          <Text style={styles.fullName}>{user.full_name}</Text>
        </View>
      </View>
      <Text style={styles.postsHeader}>Posts</Text>
      <View style={styles.usersPostsContainer}>
        <Card containerStyle={styles.usersPostCard}>
          <Image
            source={{uri: avatar}}
            style={styles.postImage}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text>Title</Text>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
    backgroundColor: 'red',
    height: 250,
  },
  profileImage: {
    flex: 1,
    width: 150,
    height: 150,
    aspectRatio: 1,
    borderRadius: 150 / 2,
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 50,
  },
  userTextContainer: {
    flex: 1,
  },
  fullName: {
    fontSize: 20,
    margin: 10,
    marginLeft: 25,
  },
  postsHeader: {
    fontSize: 20,
    color: 'white',
    backgroundColor: Colors.primary,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 100,
    margin: 30,
    alignSelf: 'flex-start',
  },
  usersPostsContainer: {
    backgroundColor: 'lightblue',
    width: '100%',
    height: 1000,
  },
  usersPostCard: {
    height: 300,
    backgroundColor: 'yellow',
  },
  postImage: {
    width: 150,
    height: undefined,
    aspectRatio: 4 / 3,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
