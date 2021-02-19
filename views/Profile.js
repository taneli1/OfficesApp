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
        <Card style={styles.myPostCard}>
          <Card.Title>Test</Card.Title>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
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
  usersPostsContainer: {
    backgroundColor: 'lightblue',
    width: '100%',
  },
  myPostCard: {
    height: 60,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
