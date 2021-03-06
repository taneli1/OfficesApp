import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import PostDataCard from '../components/PostDataCard';
import singlePostStyles from '../styles/SinglePost/SinglePostStyles';
import {uploadsURL} from '../utils/Variables';
import {View} from 'react-native';
import {ImageBackground} from 'react-native';
import {Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import {LogBox} from 'react-native';
import {Colors} from '../styles/Colors';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const Single = ({navigation, route}) => {
  const {data} = route.params;
  console.log('adata; ', data);
  return (
    <View style={{flex: 1}}>
      <View style={singlePostStyles.bgContainer}>
        <ImageBackground
          style={singlePostStyles.bgImage}
          source={{uri: uploadsURL + data.thumbnails.w320}}
          resizeMode="stretch"
          blurRadius={20}
          opacity={0.7}
        >
          <ImageBackground
            style={singlePostStyles.bgImage}
            source={{uri: uploadsURL + data.filename}}
            resizeMode="contain"
          >
            <TouchableWithoutFeedback
              opacity="0.5"
              onPress={() => navigation.goBack()}
              style={{alignSelf: 'baseline', marginLeft: 15, marginTop: 15}}
            >
              <Icon
                name="keyboard-arrow-left"
                size={40}
                color={Colors.white}
                style={{
                  backgroundColor: Colors.primary,
                  borderRadius: 20,
                  borderColor: Colors.white,
                  elevation: 5,
                }}
              ></Icon>
            </TouchableWithoutFeedback>
          </ImageBackground>
        </ImageBackground>
      </View>

      <ScrollView
        style={singlePostStyles.container}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        removeClippedSubviews={false}
        alwaysBounceVertical={true}
      >
        <PostDataCard
          style={singlePostStyles.postData}
          navigation={navigation}
          postData={data}
        ></PostDataCard>
        {/* This makes the component scrollable all the way to the bottom*/}
        <View style={{marginTop: Dimensions.get('window').height / 1.8}}></View>
      </ScrollView>
    </View>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

// Disables a warning
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

export default Single;
