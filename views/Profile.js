import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Alert,
  Platform,
} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import {Text, Image, Button, Avatar} from 'react-native-elements';
import {useTag, useLoadMedia, useUser} from '../hooks/ApiHooks';
import {uploadsURL} from '../utils/Variables';
import {bigHeader, headerContainer} from '../styles/BasicComponents';
import {Colors} from '../styles/Colors';
import List from '../components/lists/List';
import {Dimens} from '../styles/Dimens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

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
  const [image, setImage] = useState(null);
  const usersPostsOnly = true;
  const data = useLoadMedia(usersPostsOnly, displayedUserId);
  const {getUser} = useUser();
  const {getByTag, uploadAvatarPicture} = useTag();

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    };
    const result = await ImagePicker.launchImageLibraryAsync(options);

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      doUpload();
    }
  };

  const doUpload = async () => {
    try {
      const isUploaded = await uploadAvatarPicture(image, displayedUserId);
      console.log('Upload returned: ', isUploaded);
      if (isUploaded) {
        try {
          const avatarList = await getByTag('avatar_' + displayedUserId);
          if (avatarList.length > 0) {
            setAvatar({uri: uploadsURL + avatarList.pop().filename});
          }
        } catch (error) {
          console.error(error.message);
        }
      } else {
        Alert.alert('Something went wrong, try again');
      }
    } catch (error) {
      console.log(error);
    }
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
    if (!isOwnProfile) {
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
          {isOwnProfile && (
            <Button
              title="Change profile picture"
              buttonStyle={styles.changeProfileImageButton}
              titleStyle={styles.changeProfileImageButtonTitle}
              onPress={pickImage}
            ></Button>
          )}
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
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  changeProfileImageButton: {
    backgroundColor: Colors.primary,
    margin: 10,
    marginTop: 5,
    padding: 2,
  },
  changeProfileImageButtonTitle: {
    fontSize: Dimens.fontSizes.textSmall,
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
