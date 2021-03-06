import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimens} from '../styles/Dimens';
import {Colors} from '../styles/Colors';

// Login/register button component shown in some screens when using the app anonymously.
const LoginButton = () => {
  const {setIsUsingAnonymously} = useContext(MainContext);

  return (
    <View style={styles.loginButtonContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>
          You need to login or register to use this feature!
        </Text>
        <Button
          title="Login or register"
          buttonStyle={styles.loginOrRegisterButton}
          onPress={async () => {
            setIsUsingAnonymously(false);
            await AsyncStorage.clear();
          }}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginButtonContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  contentContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: 'white',
  },
  text: {
    fontSize: Dimens.fontSizes.textMedium,
    margin: 10,
    alignSelf: 'center',
  },
  loginOrRegisterButton: {
    backgroundColor: Colors.primary,
    margin: 10,
  },
});

export default LoginButton;
