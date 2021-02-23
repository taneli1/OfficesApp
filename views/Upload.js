import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {bigHeader, headerContainer} from '../styles/BasicComponents';
import {Colors} from '../styles/Colors';
import {StyleSheet} from 'react-native';
import UploadForm from '../components/UploadForm';
import {ScrollView} from 'react-native-gesture-handler';

const Upload = ({navigation}) => {
  return (
    <ScrollView>
      <View style={{paddingBottom: 60}}>
        <View style={[headerContainer, {alignSelf: 'center', marginLeft: 0}]}>
          <Text style={[bigHeader, s.header]}>Create new post</Text>
        </View>

        <View style={s.container}>
          <UploadForm navigation={navigation} />
        </View>
      </View>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  container: {
    marginStart: 20,
    marginEnd: 20,
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
