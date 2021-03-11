import React, {useContext} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useMedia} from '../hooks/ApiHooks';
import {Colors} from '../styles/Colors';
import {MainContext} from '../contexts/MainContext';
import {TouchableOpacity} from 'react-native-gesture-handler';

// Button displayed in the single screen which opens a popup menu containing options.
const PostOptionsButton = ({navigation, postData}) => {
  const {deleteFile} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  const doDelete = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    try {
      await deleteFile(postData.file_id, userToken);
      setUpdate(update + 1); // Refresh home/profile screen posts data
      navigation.pop();
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to delete');
    }
  };

  return (
    <Menu>
      <MenuTrigger>
        <TouchableOpacity>
          <Icon
            name="more-vertical"
            type="feather"
            color={Colors.white}
            size={34}
            style={styles.icon}
          ></Icon>
        </TouchableOpacity>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption
          onSelect={() =>
            Alert.alert(
              'Delete',
              'Do you really want to delete this post?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Delete',
                  onPress: doDelete,
                },
              ],
              {cancelable: false}
            )
          }
          text="Delete"
        />
        <MenuOption
          onSelect={() => navigation.push('Edit Post', {postData: postData})}
          text="Edit"
        />
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 3,
    backgroundColor: Colors.primary,
    borderRadius: 40 / 2,
    elevation: 5,
  },
});

PostOptionsButton.propTypes = {
  navigation: PropTypes.object,
  postData: PropTypes.object,
};

export default PostOptionsButton;
