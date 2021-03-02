import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Dimens} from '../../styles/Dimens';
import {Colors} from '../../styles/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag, useUser} from '../../hooks/ApiHooks';
import {appTag, uploadsURL} from '../../utils/Variables';

const ProfileContainer = ({navigation, userId}) => {
  const [user, setUser] = useState({username: 'loading'});
  const [avatar, setAvatar] = useState(require('../../assets/placeholder.png'));
  const {getUser} = useUser();
  const {getByTag} = useTag();

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
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    getUsersData();
    fetchAvatar();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.push('Profile', {userId: userId})}
    >
      <View style={styles.profileContainer}>
        <View style={styles.container}>
          <Image style={styles.image} source={avatar}></Image>
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
