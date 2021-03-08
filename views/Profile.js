import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import {Text, Image, Button, Avatar} from 'react-native-elements';
import {useTag} from '../hooks/ApiHooks';
import {uploadsURL} from '../utils/Variables';
import {View} from 'react-native';
import {bigHeader, headerContainer} from '../styles/BasicComponents';
import {Colors} from '../styles/Colors';
import List from '../components/lists/List';
import {useLoadMedia} from '../hooks/ApiHooks';
import {Dimens} from '../styles/Dimens';
import {useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation, route}) => {
  let displayedUserId;
  let userToDisplay;
  let isOwnProfile;

  if (route.params !== undefined) {
    const {userId} = route.params;
    displayedUserId = userId;
    userToDisplay = {username: 'loading', full_name: 'loading'};
    isOwnProfile = false;
  } else {
    const {user} = useContext(MainContext);
    displayedUserId = user.user_id;
    userToDisplay = user;
    isOwnProfile = true;
  }

  const {setIsLoggedIn} = useContext(MainContext);
  const [displayedUser, setDisplayedUser] = useState(userToDisplay);
  const [avatar, setAvatar] = useState(require('../assets/placeholder.png'));
  const usersPostsOnly = true;
  const tagPostsOnly = false;
  const data = useLoadMedia(usersPostsOnly, displayedUserId, tagPostsOnly);
  const {getUser} = useUser();
  const {getByTag} = useTag();

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  useEffect(() => {
    const getAnotherUsersData = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      try {
        const user = await getUser(displayedUserId, userToken);
        setDisplayedUser(user);
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchAvatar = async () => {
      try {
        const avatarList = await getByTag('avatar_' + displayedUserId);
        if (avatarList.length > 0) {
          setAvatar({uri: uploadsURL + avatarList.pop().filename});
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    if (route.params !== undefined) {
      getAnotherUsersData();
    }
    fetchAvatar();
  }, []);

  return (
    <View>
      <View style={styles.logoutButtonContainer}>
        {isOwnProfile && (
          <Button
            title="Logout"
            buttonStyle={styles.logoutButton}
            onPress={logout}
          ></Button>
        )}
      </View>
      <View style={styles.userInfoContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={avatar}
            style={styles.profileImage}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={styles.userTextContainer}>
          <View style={[headerContainer, styles.headerContainer]}>
            <Text style={bigHeader}>{displayedUser.username}</Text>
          </View>
          <View style={styles.fullNameContainer}>
            <Avatar
              icon={{
                name: 'user',
                type: 'font-awesome',
                color: 'black',
                size: 25,
                marginTop: 30,
              }}
            />
            <Text style={styles.fullName}>{displayedUser.full_name}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.postsHeader}>Posts</Text>
      <View style={styles.listContainer}>
        <List navigation={navigation} mediaArray={data} layout="profile" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutButtonContainer: {
    height: '10%',
  },
  logoutButton: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
    margin: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    height: '30%',
  },
  profileImageContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  profileImage: {
    width: 120,
    height: 120,
    aspectRatio: 1,
    borderRadius: 120 / 2,
    margin: 10,
  },
  userTextContainer: {
    flex: 1,
  },
  headerContainer: {
    marginLeft: 0,
    marginRight: 10,
    marginTop: 30,
    marginBottom: 20,
  },
  fullNameContainer: {
    flexDirection: 'row',
  },
  fullName: {
    fontSize: Dimens.fontSizes.textMedium,
    margin: 5,
  },
  postsHeader: {
    fontSize: Dimens.fontSizes.textMedium,
    color: 'white',
    backgroundColor: Colors.primary,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 100,
    margin: 15,
    marginLeft: 30,
    alignSelf: 'flex-start',
  },
  listContainer: {
    height: '50%',
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Profile;
