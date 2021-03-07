import React, {useContext} from 'react';
import {Alert, View, StyleSheet} from 'react-native';
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

const PostOptionsButton = ({navigation, postData}) => {
  const {deleteFile} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  const doDelete = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    try {
      await deleteFile(postData.file_id, userToken);
      setUpdate(update + 1); // Refresh home/profile screen posts data
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to delete');
    }
  };

  return (
    <View style={styles.postOptionsButton}>
      <Menu>
        <MenuTrigger>
          <TouchableOpacity>
            <Icon
              name="more-vertical"
              type="feather"
              color="white"
              size={30}
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
            onSelect={() => navigation.push('Edit Post')}
            text="Edit"
          />
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  postOptionsButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.primary,
    borderRadius: 50 / 2,
    alignItems: 'center',
  },
  icon: {
    marginTop: 4,
  },
});

PostOptionsButton.propTypes = {
  navigation: PropTypes.object,
  postData: PropTypes.object,
};

export default PostOptionsButton;
