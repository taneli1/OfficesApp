import React from 'react';
import {Image} from 'react-native';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Dimens} from '../styles/Dimens';
import {Colors} from '../styles/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ProfileContainer = ({userData}) => {
  return (
    <TouchableOpacity>
      {/* // TODO onPress here to profile page, fetch profile image */}
      <View style={styles.profileContainer}>
        <Image
          style={styles.image}
          source={require('../assets/placeholder.png')}
        ></Image>
        <Text style={styles.profileText}>Profilename</Text>
      </View>
    </TouchableOpacity>
  );
};

ProfileContainer.propTypes = {
  userData: PropTypes.object,
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
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 75,
  },
});

export default ProfileContainer;
