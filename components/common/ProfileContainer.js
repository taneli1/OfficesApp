import React from 'react';
import {Image} from 'react-native';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Dimens} from '../../styles/Dimens';
import {Colors} from '../../styles/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

// Parameter userData, //TODO Link needed stuff
const ProfileContainer = ({navigation, userData}) => {
  return (
    <TouchableOpacity>
      <View style={styles.profileContainer}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../../assets/placeholder.png')}
          ></Image>
          <Text style={styles.profileText}>Profilename</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ProfileContainer.propTypes = {
  navigation: PropTypes.object,
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

export default ProfileContainer;
