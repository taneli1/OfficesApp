import React, {useContext, useState} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin} from '../hooks/ApiHooks';
import useLoginForm from '../hooks/LoginHooks';
import {Colors} from '../styles/Colors';

const LoginForm = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const {inputs, handleInputChange} = useLoginForm();
  const {postLogin} = useLogin();
  const {setUser, setIsLoggedIn} = useContext(MainContext);

  const doLogin = async () => {
    setLoading(true);
    try {
      const userData = await postLogin(inputs);
      setUser(userData.user);
      setIsLoggedIn(true);
      await AsyncStorage.setItem('userToken', userData.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('postLogin error', error.message);
      Alert.alert('Invalid username or password');
    }
  };

  return (
    <View>
      <Input
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        style={[styles.inputField, {marginTop: 20}]}
      />
      <Input
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
        style={styles.inputField}
      />
      <Button
        title="Login"
        onPress={doLogin}
        loading={loading}
        buttonStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    marginLeft: 30,
    marginRight: 30,
  },
  inputField: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.primary,
    padding: 5,
  },
});

LoginForm.propTypes = {
  navigation: PropTypes.object,
};

export default LoginForm;
