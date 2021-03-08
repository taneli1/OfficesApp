import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from '../styles/Colors';
import PropTypes from 'prop-types';
import {bigHeader, headerContainer} from '../styles/BasicComponents';
import EditForm from '../components/EditForm';

const EditPost = ({navigation, route}) => {
  const {postData} = route.params;

  return (
    <View>
      <ScrollView>
        <View style={{paddingBottom: 60}}>
          <View style={[headerContainer, {alignSelf: 'center', marginLeft: 0}]}>
            <Text style={[bigHeader, styles.header]}>Edit post info</Text>
          </View>

          <View style={styles.container}>
            <EditForm navigation={navigation} postData={postData} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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

EditPost.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default EditPost;
