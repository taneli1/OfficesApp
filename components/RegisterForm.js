import React from 'react';
import {Alert, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {useLogin, useUser} from '../hooks/ApiHooks';
import useSignUpForm from '../hooks/RegisterHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {Input, Button} from 'react-native-elements';

const RegisterForm = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {
    inputs,
    handleInputChange,
    handleInputEnd,
    checkUserAvailable,
    registerErrors,
    validateOnSend,
  } = useSignUpForm();
  const {postRegister} = useUser();
  const {postLogin} = useLogin();

  const doRegister = async () => {
    if (!validateOnSend()) {
      Alert.alert('Input validation failed');
      console.log('validate on send failed');
      return;
    }
    delete inputs.confirmPassword;
    try {
      const result = await postRegister(inputs);
      console.log('doRegister ok', result.message);
      Alert.alert(result.message);
      // do automatic login after registering
      const userData = await postLogin(inputs);
      await AsyncStorage.setItem('userToken', userData.token);
      setIsLoggedIn(true);
      setUser(userData.user);
    } catch (error) {
      console.log('registration error', error);
      Alert.alert(error.message);
    }
  };

  return (
    <View>
      <Input
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={(event) => {
          // console.log(event.nativeEvent.text);
          checkUserAvailable(event);
          handleInputEnd('username', event.nativeEvent.text);
        }}
        errorMessage={registerErrors.username}
        style={styles.inputField}
      />
      <Input
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        onEndEditing={(event) =>
          handleInputEnd('password', event.nativeEvent.text)
        }
        secureTextEntry={true}
        errorMessage={registerErrors.password}
        style={styles.inputField}
      />
      <Input
        autoCapitalize="none"
        placeholder="confirm password"
        onChangeText={(txt) => handleInputChange('confirmPassword', txt)}
        onEndEditing={(event) =>
          handleInputEnd('confirmPassword', event.nativeEvent.text)
        }
        secureTextEntry={true}
        errorMessage={registerErrors.confirmPassword}
        style={styles.inputField}
      />
      <Input
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
        onEndEditing={(event) =>
          handleInputEnd('email', event.nativeEvent.text)
        }
        errorMessage={registerErrors.email}
        style={styles.inputField}
      />
      <Input
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
        onEndEditing={(event) =>
          handleInputEnd('full_name', event.nativeEvent.text)
        }
        errorMessage={registerErrors.full_name}
        style={styles.inputField}
      />
      <Button
        title="Register!"
        onPress={doRegister}
        buttonStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#157A46',
    marginLeft: 30,
    marginRight: 30,
  },
  inputField: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#157A46',
    padding: 5,
  },
});

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterForm;
