/* eslint-disable no-undef */
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
import {appTag, uploadsURL} from '../utils/Variables';
import {bigHeader, headerContainer} from '../styles/BasicComponents';
import {Colors} from '../styles/Colors';
import {Dimens} from '../styles/Dimens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import LoginButton from '../components/LoginButton';
import {FlatList} from 'react-native-gesture-handler';
import ProfilePost from '../components/listitems/ProfilePost';

const Profile = ({navigation, route}) => {
  let displayedUserId;
  let userToDisplay;
  let isOwnProfile;

  const {user, setUser, isLoggedIn, setIsLoggedIn} = useContext(MainContext);

  // If route params are passed, i.e. the profile screen is accessed through the ProfileContainer rather than app navigation, the user is
  // set based on the user_id which is passed as a parameter. An initial user data shows 'loading' before it's fetched. Else the user is the
  // app's user.
  if (route.params !== undefined) {
    const {userId} = route.params;
    displayedUserId = userId;
    userToDisplay = {username: 'loading', full_name: 'loading'};
    isOwnProfile = false;
  } else {
    displayedUserId = user.user_id;
    userToDisplay = user;
    isOwnProfile = true;
  }

  const [displayedUser, setDisplayedUser] = useState(userToDisplay);
  const [avatar, setAvatar] = useState();
  const [imageToUpload, setImageToUpload] = useState(null);
  const [profilePictureUpdated, setProfilePictureUpdated] = useState(0);
  const [profilePicturePicking, setProfilePicturePicking] = useState(false);
  const [profilePicturePicked, setProfilePicturePicked] = useState(false);
  const usersPostsOnly = true;
  const tagPostsOnly = false;
  const data = useLoadMedia(usersPostsOnly, displayedUserId, tagPostsOnly);
  const {getUser} = useUser();
  const {getByTag, uploadAvatarPicture} = useTag();

  // Function for logging out
  const logout = async () => {
    setIsLoggedIn(false);
    setUser({});
    await AsyncStorage.clear();
  };

  // Function for picking a new profile picture
  const pickImage = async () => {
    setProfilePicturePicking(true);
    // Current avatar is hidden while picking a new one
    setAvatar();

    if (Platform.OS !== 'web') {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    };
    const result = await ImagePicker.launchImageLibraryAsync(options);

    console.log(result);

    if (!result.cancelled) {
      setImageToUpload(result.uri);
      console.log(result.uri);
      setProfilePicturePicked(true);
      setAvatar({uri: result.uri});
    } else {
      setProfilePicturePicked(false);
      // Refreshes the profile picture component with useEffect and a state variable
      setProfilePictureUpdated(profilePictureUpdated + 1);
    }
    setProfilePicturePicking(false);
  };

  // Function for uploading the picked profile picture
  const doUpload = async () => {
    try {
      const isUploaded = await uploadAvatarPicture(
        imageToUpload,
        displayedUserId
      );
      console.log('Upload returned: ', isUploaded);
      if (isUploaded) {
        try {
          Alert.alert('Profile picture changed!');
          // Refreshes the profile picture component with useEffect and a state variable
          setProfilePictureUpdated(profilePictureUpdated + 1);
          setProfilePicturePicked(false);
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

  // useEffect fetches the user data if the profile is not the user's own profile. The newest avatar picture of a user is also fetched always
  // when it's changed.
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
        const avatarList = await getByTag(appTag + 'avatar_' + displayedUserId);
        if (avatarList.length > 0) {
          setAvatar({uri: uploadsURL + avatarList.pop().filename});
        } else {
          setAvatar(require('../assets/placeholder.png'));
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    if (!isOwnProfile && isLoggedIn) {
      getAnotherUsersData();
    }
    fetchAvatar();
  }, [profilePictureUpdated]);

  return (
    <View>
      {/* If the user is logged in, the profile page is rendered, if not, a login/register button is rendered instead.
      The list header component includes all the user info components and after that the user's posts are rendered in the list. */}
      {isLoggedIn ? (
        <FlatList
          ListHeaderComponent={
            <>
              <View style={styles.userInfoContainer}>
                <View style={styles.profileImageContainer}>
                  <Image
                    source={avatar}
                    style={styles.profileImage}
                    PlaceholderContent={
                      <ActivityIndicator size="large" color={Colors.primary} />
                    }
                  />
                  {/* Buttons related to changing the profile picture are only rendered if the profile is the user's own profile. */}
                  {isOwnProfile && (
                    <View style={styles.profileImageButtonContainer}>
                      {/* Confirm and cancel buttons are only rendered when a new profile picture has been picked. Otherwise the change profile
                      picture button is rendered. */}
                      {!profilePicturePicking && !profilePicturePicked ? (
                        <Button
                          title="Change profile picture"
                          buttonStyle={styles.smallButton}
                          titleStyle={styles.smallButtonTitle}
                          onPress={pickImage}
                        ></Button>
                      ) : (
                        <>
                          {profilePicturePicked ? (
                            <>
                              <Button
                                title="Confirm"
                                buttonStyle={styles.confirmButton}
                                titleStyle={styles.smallButtonTitle}
                                onPress={doUpload}
                              ></Button>
                              {/* When the cancel button is pressed, the profilePicturePicked state variable is set to false and the
                              profilePictureUpdated state variable is updated to make the useEffect fetch the original profile picture back. */}
                              <Button
                                title="Cancel"
                                buttonStyle={styles.cancelButton}
                                titleStyle={styles.smallButtonTitle}
                                onPress={() => {
                                  setProfilePicturePicked(false);
                                  setProfilePictureUpdated(
                                    profilePictureUpdated + 1
                                  );
                                }}
                              ></Button>
                            </>
                          ) : (
                            <View style={styles.activityIndicatorContainer}>
                              <ActivityIndicator
                                size="small"
                                color={Colors.primary}
                              />
                            </View>
                          )}
                        </>
                      )}
                    </View>
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
                      }}
                    />
                    <Text style={styles.fullName}>
                      {displayedUser.full_name}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.postsHeader}>Posts</Text>
              {/* Logout button is rendered only if the profile is the user's own profile. */}
              {isOwnProfile && (
                <View style={styles.logoutButtonContainer}>
                  <Button
                    title="Logout"
                    buttonStyle={styles.logoutButton}
                    onPress={logout}
                  ></Button>
                </View>
              )}
            </>
          }
          contentContainerStyle={styles.listComponent}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <ProfilePost
              navigation={navigation}
              data={item}
              isUsersPost={item.user_id === user.user_id}
            />
          )}
        />
      ) : (
        <View>
          <LoginButton></LoginButton>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listComponent: {
    paddingBottom: 50,
  },
  userInfoContainer: {
    flexDirection: 'row',
    height: 230,
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
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  profileImageButtonContainer: {
    flexDirection: 'row',
  },
  smallButton: {
    backgroundColor: Colors.primary,
    margin: 10,
    marginTop: 5,
    padding: 2,
    paddingStart: 5,
    paddingEnd: 5,
  },
  confirmButton: {
    backgroundColor: '#25de14',
    margin: 10,
    marginTop: 5,
    padding: 2,
  },
  cancelButton: {
    backgroundColor: Colors.red,
    margin: 10,
    marginTop: 5,
    padding: 2,
  },
  smallButtonTitle: {
    fontSize: Dimens.fontSizes.textSmall,
  },
  activityIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 60,
    marginRight: 60,
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
  fullNameContainer: {
    flexDirection: 'row',
  },
  fullName: {
    fontSize: Dimens.fontSizes.textMedium,
    margin: 5,
  },
  postsHeader: {
    fontSize: Dimens.fontSizes.textMedium,
    color: Colors.white,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 100,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  logoutButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  logoutButton: {
    backgroundColor: Colors.primary,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Profile;
