import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {bigHeader, headerContainer} from '../styles/BasicComponents';
import {Colors} from '../styles/Colors';
import {StyleSheet} from 'react-native';
import UploadForm from '../components/UploadForm';
import {ScrollView} from 'react-native-gesture-handler';
import {MainContext} from '../contexts/MainContext';
import LoginButton from '../components/LoginButton';

const Upload = ({navigation}) => {
  const {isLoggedIn} = useContext(MainContext);

  return (
    <View>
      {isLoggedIn ? (
        <>
          <ScrollView>
            <View style={{paddingBottom: 60}}>
              <View style={s.container}>
                <UploadForm navigation={navigation} />
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <>
          <View>
            <LoginButton></LoginButton>
          </View>
        </>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    marginStart: 20,
    marginEnd: 20,
    marginTop: 40,
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    elevation: 10,
  },
  header: {
    backgroundColor: Colors.white,
    color: Colors.primary,
    marginLeft: 0,
    marginTop: 40,
    marginBottom: 40,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRadius: 10,
  },
});

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
