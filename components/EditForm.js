import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {Alert} from 'react-native';
import {Colors} from '../styles/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import useUploadForm from '../hooks/UploadHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditForm = ({navigation, postData}) => {
  let descriptionData = JSON.parse(postData.description);
  const postDescription = descriptionData[0];
  const postLinks = descriptionData[1];

  const [isUploading, setIsUploading] = useState(false);
  const {updateFile} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  const {
    handleInputChange,
    inputs,
    setInputs,
    uploadErrors,
    reset,
  } = useUploadForm();

  const updateDescriptionArray = async () => {
    descriptionData = [inputs.description, postLinks];
    setInputs({
      title: inputs.title,
      description: JSON.stringify(descriptionData),
    });
  };

  const doUpdate = async () => {
    try {
      setIsUploading(true);
      const userToken = await AsyncStorage.getItem('userToken');
      const resp = await updateFile(postData.file_id, inputs, userToken);
      console.log('update response', resp);
      setUpdate(update + 1);
      navigation.pop(2);
    } catch (error) {
      Alert.alert('Update', 'Failed');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    setInputs({
      title: postData.title,
      description: postDescription,
    });
  }, []);

  const doReset = () => {
    reset();
  };

  return (
    <View style={styles.container}>
      <View style={styles.sHeaderContainer}>
        <TouchableOpacity onPress={doReset}>
          <Icon
            style={{alignSelf: 'flex-end', marginRight: 10}}
            size={32}
            color={Colors.primary}
            name="refresh"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Input
          id="title"
          inputContainerStyle={{borderColor: Colors.primary}}
          autoCapitalize="sentences"
          placeholder="Title"
          value={inputs.title}
          onChangeText={(txt) => handleInputChange('title', txt)}
          errorMessage={uploadErrors.title}
        />
        <Input
          id="desc"
          inputContainerStyle={{borderColor: Colors.primary}}
          autoCapitalize="sentences"
          value={inputs.description}
          placeholder="Description"
          onChangeText={(txt) => handleInputChange('description', txt)}
          onEndEditing={updateDescriptionArray}
          errorMessage={uploadErrors.description}
        />
      </View>
      {isUploading ? (
        <ActivityIndicator
          style={{marginTop: 20, paddingBottom: 20}}
          size="large"
          color={Colors.primary}
        />
      ) : (
        <Button
          buttonStyle={styles.button}
          containerStyle={{elevation: 4, marginTop: 14}}
          title="Upload"
          onPress={doUpdate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

EditForm.propTypes = {
  navigation: PropTypes.object,
  postData: PropTypes.object,
};

export default EditForm;
