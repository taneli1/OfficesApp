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
import {Colors} from '../styles/Colors';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser, setIsUsingAnonymously} = useContext(
    MainContext
  );
  const [formToggle, setFormToggle] = useState(true);
  const [logInStatusChecked, setLogInStatusChecked] = useState(false);
  const {checkToken} = useUser();

  // Function for checking whether a user is already logged in or used the app anonymously, and checking the authentication token.
  const getToken = async () => {
    const anonymousUser = await AsyncStorage.getItem('anonymousUser');
    if (anonymousUser === 'true') {
      setIsUsingAnonymously(true);
    } else {
      const userToken = await AsyncStorage.getItem('userToken');
      console.log('token', userToken);
      if (userToken) {
        try {
          const userData = await checkToken(userToken);
          setIsLoggedIn(true);
          setUser(userData);
        } catch (error) {
          console.log('token check failed', error.message);
        }
      }
    }
  };

  // Function for skipping the login and using the app anonymously.
  const skipLogin = async () => {
    setIsUsingAnonymously(true);
    await AsyncStorage.setItem('anonymousUser', 'true');
  };

  useEffect(() => {
    getToken();
    // A half second timeout to prevent the login form from appearing for a short time before getting to the home screen when the user is
    // already logged in or used the app previously anonymously.
    const timer = setTimeout(() => {
      setLogInStatusChecked(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* If login status is checked, the login and registration forms will be rendered. */}
      {logInStatusChecked ? (
        <>
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
                        <TouchableHighlight
                          underlayColor={'transparent'}
                          onPress={skipLogin}
                        >
                          <ListItem containerStyle={styles.listItem}>
                            <ListItem.Content>
                              <Text style={styles.text}>
                                Continue without logging in
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
        </>
      ) : (
        <>
          {/* A splashscreen image is rendered while the login status is checked in the useEffect. */}
          <ImageBackground
            source={require('../assets/splashscreen.png')}
            style={styles.image}
          ></ImageBackground>
        </>
      )}
    </>
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
    backgroundColor: Colors.primary,
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
