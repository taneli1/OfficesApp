import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Input, Button} from 'react-native-elements';
import PropTypes from 'prop-types';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import {StackActions} from '@react-navigation/native';
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
import TagSelector from './common/TagSelector';

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
    if (!validateOnSend()) {
      return;
    }

    try {
      const isUploaded = await uploadPost(image, inputs);
      console.log(isUploaded);
      if (isUploaded) {
        setUpdate(update + 1); // Refresh home data
        doReset();
        const pushAction = StackActions.push('Home', {});
        navigation.dispatch(pushAction);
      } else Alert.alert('Something went wrong, try again');
    } catch (error) {
      console.log(error);
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
        <TagSelector />
      </View>

      <Button
        buttonStyle={s.button}
        containerStyle={{elevation: 4, marginTop: 14}}
        title="Upload"
        onPress={doUpload}
        disabled={image != null ? false : true}
      />
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