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
        containerStyle={{paddingLeft: 15, paddingRight: 15}}
        autoCapitalize="none"
        placeholder="Username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        style={[styles.inputField, {marginTop: 25}]}
      />
      <Input
        containerStyle={{paddingLeft: 15, paddingRight: 15}}
        autoCapitalize="none"
        placeholder="Password"
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
    padding: 6,
    paddingLeft: 10,
  },
});

LoginForm.propTypes = {
  navigation: PropTypes.object,
};

export default LoginForm;
