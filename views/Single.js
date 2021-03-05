import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import PostDataCard from '../components/PostDataCard';
import singlePostStyles from '../styles/SinglePost/SinglePostStyles';
import {uploadsURL} from '../utils/Variables';
import {View} from 'react-native';
import {ImageBackground} from 'react-native';
import {Dimensions} from 'react-native';
import PostOptionsButton from '../components/PostOptionsButton';
import {MainContext} from '../contexts/MainContext';

const Single = ({navigation, route}) => {
  const {data} = route.params;
  const {user} = useContext(MainContext);

  let isOwnFile;
  if (data.user_id === user.user_id) {
    isOwnFile = true;
  }

  return (
    <View style={{flex: 1}}>
      <View style={singlePostStyles.bgContainer}>
        <ImageBackground
          style={singlePostStyles.bgImage}
          source={{uri: uploadsURL + data.filename}}
        />
      </View>

      <ScrollView
        style={singlePostStyles.container}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        removeClippedSubviews={false}
      >
        <PostDataCard
          style={singlePostStyles.postData}
          navigation={navigation}
          postData={data}
        ></PostDataCard>
        {/* This makes the component scrollable all the way to the bottom*/}
        <View style={{marginTop: Dimensions.get('window').height / 1.8}}></View>
      </ScrollView>
      {isOwnFile && (
        <View
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
          }}
        >
          <PostOptionsButton
            navigation={navigation}
            postData={data}
          ></PostOptionsButton>
        </View>
      )}
    </View>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

// Disables a warning
import {LogBox} from 'react-native';
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

export default Single;
