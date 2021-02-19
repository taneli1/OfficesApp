/* eslint-disable no-undef */
import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Card, ListItem, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const [formToggle, setFormToggle] = useState(true);
  const {checkToken} = useUser();

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken) {
      try {
        const userData = await checkToken(userToken);
        setIsLoggedIn(true);
        setUser(userData);
        navigation.navigate('Home');
      } catch (error) {
        console.log('token check failed', error.message);
      }
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <ImageBackground
              source={require('../assets/background.png')}
              style={styles.image}
            >
              <View style={styles.form}>
                {formToggle ? (
                  <>
                    <Text style={styles.title}>Login</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.title}>Register</Text>
                  </>
                )}
                <Card containerStyle={styles.card}>
                  {formToggle ? (
                    <>
                      <LoginForm navigation={navigation} />
                    </>
                  ) : (
                    <>
                      <RegisterForm navigation={navigation} />
                    </>
                  )}
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => {
                      setFormToggle(!formToggle);
                    }}
                  >
                    <ListItem containerStyle={styles.listItem}>
                      <ListItem.Content>
                        <Text style={styles.text}>
                          {formToggle
                            ? 'No account? Register here.'
                            : 'Already registered? Login here.'}
                        </Text>
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem>
                  </TouchableHighlight>
                </Card>
              </View>
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    backgroundColor: '#157A46',
    color: 'white',
    fontSize: 30,
    alignSelf: 'flex-start',
    padding: 10,
    marginLeft: 30,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginLeft: 30,
    marginRight: 30,
  },
  listItem: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  text: {
    alignSelf: 'center',
    padding: 10,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
