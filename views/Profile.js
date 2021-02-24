import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import {Text, Image} from 'react-native-elements';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/Variables';
import {View} from 'react-native';
import {bigHeader, headerContainer} from '../styles/BasicComponents';
import {Colors} from '../styles/Colors';
import List from '../components/lists/List';
import {useLoadMedia} from '../hooks/ApiHooks';

const Profile = ({navigation}) => {
  const {user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getByTag} = useTag();
  const usersPostsOnly = true;
  const data = useLoadMedia(usersPostsOnly, user.user_id);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatarList = await getByTag('avatar_' + user.user_id);
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
    <View>
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
    margin: 15,
    marginLeft: 30,
    alignSelf: 'flex-start',
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
