import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import {Text, Image} from 'react-native-elements';
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

  if (route.params !== undefined) {
    const {userId} = route.params;
    displayedUserId = userId;
    userToDisplay = {username: 'loading', full_name: 'loading'};
  } else {
    const {user} = useContext(MainContext);
    displayedUserId = user.user_id;
    userToDisplay = user;
  }

  const [displayedUser, setDisplayedUser] = useState(userToDisplay);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const usersPostsOnly = true;
  const data = useLoadMedia(usersPostsOnly, displayedUserId);
  const {getUser} = useUser();
  const {getByTag} = useTag();

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
          setAvatar(uploadsURL + avatarList.pop().filename);
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
      <View style={styles.userInfoContainer}>
        <Image
          source={{uri: avatar}}
          style={styles.profileImage}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.userTextContainer}>
          <View style={[headerContainer, styles.headerContainer]}>
            <Text style={bigHeader}>{displayedUser.username}</Text>
          </View>
          <Text style={styles.fullName}>{displayedUser.full_name}</Text>
        </View>
      </View>
      <Text style={styles.postsHeader}>Posts</Text>
      <List navigation={navigation} mediaArray={data} layout="profile" />
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
    height: 240,
  },
  profileImage: {
    flex: 1,
    width: 150,
    height: 150,
    aspectRatio: 1,
    borderRadius: 150 / 2,
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 50,
  },
  userTextContainer: {
    flex: 1,
  },
  headerContainer: {
    marginLeft: 0,
    marginRight: 10,
    marginTop: 70,
    marginBottom: 20,
  },
  fullName: {
    fontSize: Dimens.fontSizes.textMedium,
    margin: 10,
    marginLeft: 0,
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
});

Profile.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Profile;
