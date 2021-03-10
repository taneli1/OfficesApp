/* eslint-disable guard-for-in */
import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Input, Button} from 'react-native-elements';
import PropTypes from 'prop-types';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import {useTag} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import {Alert} from 'react-native';
import {Platform} from 'react-native';
import {Colors} from '../styles/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from 'react-native';
import {Dimens} from '../styles/Dimens';
import {Icon} from 'react-native-elements';
import {smallHeader, headerContainer} from '../styles/BasicComponents';
import {TagSelector, getSelectedTags} from './functional/TagSelector';
import {LinkCreator, getCreatedLinkObjects} from './functional/LinkCreator';
import {ActivityIndicator} from 'react-native';

const UploadForm = ({navigation}) => {
  const {
    inputs,
    handleInputChange,
    validateOnSend,
    handleInputEnd,
    uploadErrors,
    reset,
  } = useUploadForm();
  const [image, setImage] = useState(null);
  const {update, setUpdate} = useContext(MainContext);
  const {uploadPost} = useTag();
  const [isUploading, setIsUploading] = useState(false);

  const chooseMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
    }
  };

  const doReset = () => {
    setImage(null);
    reset();
  };

  const doUpload = async () => {
    const selectedTags = getSelectedTags();
    console.log('Selected tags: ', getSelectedTags());
    if (!validateOnSend()) {
      return;
    } /* else if (selectedTags.length === 0) {
      Alert.alert('Select atleast one tag');
      return;
    } */
    setIsUploading(true);

    /*
      Create the description array here, which contains the description
      itself, and the ItemLinkObjects if the user has added any
     */
    const listOfObjects = getCreatedLinkObjects();
    const data = [inputs.description, listOfObjects];

    try {
      const isUploaded = await uploadPost(image, inputs, selectedTags, data);
      setIsUploading(false);
      console.log('Upload returned: ', isUploaded);
      if (isUploaded) {
        setUpdate(update + 1); // Refresh home data
        doReset();
        setTimeout(() => {
          navigation.navigate('Home');
          setUpdate(update + 1);
        }, 1000);
      } else Alert.alert('Something went wrong, try again');
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  return (
    <View style={s.container}>
      <TouchableOpacity onPress={chooseMedia}>
        <View style={s.imageTextContainer}>
          <Text style={s.imageText}>Choose Image</Text>
          <Icon name="add" color={Colors.white}></Icon>
        </View>
        <Image
          source={{uri: image}}
          style={{width: '100%', height: 250}}
          resizeMode="cover"
        ></Image>
      </TouchableOpacity>

      <View style={s.sHeaderContainer}>
        <View style={[headerContainer, {marginLeft: 15}]}>
          <Text style={smallHeader}>Required fields</Text>
        </View>

        <TouchableOpacity onPress={doReset}>
          <Icon
            style={{alignSelf: 'flex-end', marginRight: 10}}
            size={32}
            color={Colors.primary}
            name="refresh"
          />
        </TouchableOpacity>
      </View>

      <View style={s.inputContainer}>
        <Input
          id="title"
          inputContainerStyle={{borderColor: Colors.primary}}
          autoCapitalize="sentences"
          placeholder="Title"
          value={inputs.title}
          onChangeText={(txt) => handleInputChange('title', txt)}
          onEndEditing={(event) =>
            handleInputEnd('title', event.nativeEvent.text)
          }
          errorMessage={uploadErrors.title}
        />
        <Input
          containerStyle={{}}
          inputContainerStyle={{borderColor: Colors.primary}}
          id="desc"
          value={inputs.description}
          autoCapitalize="sentences"
          placeholder="Description"
          onChangeText={(txt) => handleInputChange('description', txt)}
          onEndEditing={(event) =>
            handleInputEnd('description', event.nativeEvent.text)
          }
          errorMessage={uploadErrors.description}
        />
      </View>

      <View style={s.sHeaderContainer}>
        <View style={[headerContainer, {marginLeft: 15, marginTop: 0}]}>
          <Text style={smallHeader}>Add tags to post</Text>
        </View>
      </View>

      <View style={s.inputContainer}>
        <TagSelector></TagSelector>
      </View>

      <View style={s.sHeaderContainer}>
        <View style={[headerContainer, {marginLeft: 15, marginTop: 0}]}>
          <Text style={smallHeader}>Link items in picture</Text>
        </View>
      </View>

      <View>
        <LinkCreator />
      </View>

      {isUploading === true ? (
        <ActivityIndicator
          style={{marginTop: 20, paddingBottom: 20}}
          size="large"
          color={Colors.primary}
        />
      ) : (
        <Button
          buttonStyle={s.button}
          containerStyle={{elevation: 4, marginTop: 14}}
          title="Upload"
          onPress={doUpload}
          disabled={image != null ? false : true}
        />
      )}
    </View>
  );
};

const s = StyleSheet.create({
  imageTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  imageText: {
    color: Colors.white,
    fontSize: Dimens.fontSizes.bigHeader,
  },
  input: {},
  button: {
    color: Colors.primary,
    backgroundColor: Colors.primary,
  },
  sHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignContent: 'center',
  },
  inputContainer: {
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
  },
});

UploadForm.propTypes = {
  navigation: PropTypes.object,
};

export default UploadForm;
