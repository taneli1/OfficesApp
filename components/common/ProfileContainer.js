/* eslint-disable no-undef */
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import {Image} from 'react-native-elements';
import PropTypes from 'prop-types';
import {Dimens} from '../../styles/Dimens';
import {Colors} from '../../styles/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag, useUser} from '../../hooks/ApiHooks';
import {appTag, uploadsURL} from '../../utils/Variables';
import {MainContext} from '../../contexts/MainContext';

const ProfileContainer = ({navigation, userId}) => {
  const [user, setUser] = useState({username: 'user'});
  const [avatar, setAvatar] = useState();
  const {getUser} = useUser();
  const {getByTag} = useTag();
  const {isLoggedIn} = useContext(MainContext);

  useEffect(() => {
    const getUsersData = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      try {
        const user = await getUser(userId, userToken);
        setUser(user);
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchAvatar = async () => {
      try {
        const avatarList = await getByTag(appTag + 'avatar_' + userId);
        if (avatarList.length > 0) {
          setAvatar({uri: uploadsURL + avatarList.pop().filename});
        } else {
          setAvatar(require('../../assets/placeholder.png'));
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    if (isLoggedIn) {
      getUsersData();
    }
    fetchAvatar();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.push('Profile', {userId: userId})}
    >
      <View style={styles.profileContainer}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={avatar}
            PlaceholderContent={
              <ActivityIndicator size="small" color={Colors.primary} />
            }
          ></Image>
          <Text style={styles.profileText}>{user.username}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ProfileContainer.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
};

const styles = StyleSheet.create({
  profileText: {
    fontSize: Dimens.fontSizes.textMedium,
    alignSelf: 'center',
    marginLeft: 10,
    color: Colors.darkGreen,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 75,
  },
  container: {
    flexDirection: 'row',
  },
});

ProfileContainer.propTypes = {
  navigation: PropTypes.object,
  userId: PropTypes.number,
};

export default ProfileContainer;
