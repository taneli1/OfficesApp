import React, {useContext, useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  ImageBackground,
  LogBox,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import PostDataCard from '../components/PostDataCard';
import singlePostStyles from '../styles/SinglePost/SinglePostStyles';
import {uploadsURL} from '../utils/Variables';
import PostOptionsButton from '../components/PostOptionsButton';
import {MainContext} from '../contexts/MainContext';
import {Icon} from 'react-native-elements';
import {Colors} from '../styles/Colors';
import {Video} from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

const Single = ({navigation, route}) => {
  const {data} = route.params;
  const {user} = useContext(MainContext);
  const [videoRef, setVideoRef] = useState(null);

  let isOwnFile;
  if (data.user_id === user.user_id) {
    isOwnFile = true;
  }

  console.log('adata; ', data);

  const unlock = async () => {
    try {
      await ScreenOrientation.unlockAsync();
    } catch (error) {
      console.error('unlock', error.message);
    }
  };

  const lock = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    } catch (error) {
      console.error('lock', error.message);
    }
  };

  const handleVideoRef = (component) => {
    setVideoRef(component);
  };

  const showVideoInFullscreen = async () => {
    try {
      if (videoRef) await videoRef.presentFullscreenPlayer();
    } catch (error) {
      console.error('fullscreen', error.message);
    }
  };

  useEffect(() => {
    unlock();

    const orientSub = ScreenOrientation.addOrientationChangeListener((evt) => {
      console.log('orientation', evt);
      if (evt.orientationInfo.orientation > 2) {
        // show video in fullscreen
        showVideoInFullscreen();
      }
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientSub);
      lock();
    };
  }, [videoRef]);

  return (
    <View style={{flex: 1}}>
      {data.media_type === 'image' ? (
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
            ></ImageBackground>
          </ImageBackground>
        </View>
      ) : (
        <View style={singlePostStyles.videoContainer}>
          <Video
            ref={handleVideoRef}
            source={{uri: uploadsURL + data.filename}}
            style={{width: '100%', height: undefined, aspectRatio: 16 / 9}}
            useNativeControls={true}
            resizeMode="contain"
            onError={(err) => {
              console.error('video', err);
            }}
            posterSource={{uri: uploadsURL + data.screenshot}}
          />
        </View>
      )}
      <View style={singlePostStyles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon
            name="keyboard-arrow-left"
            size={40}
            color={Colors.white}
            style={singlePostStyles.backButtonIcon}
          ></Icon>
        </TouchableOpacity>
      </View>
      {isOwnFile && (
        <View style={singlePostStyles.postOptionsButtonContainer}>
          <PostOptionsButton
            navigation={navigation}
            postData={data}
          ></PostOptionsButton>
        </View>
      )}
      {data.media_type === 'image' ? (
        <ScrollView
          style={singlePostStyles.postDataContainer}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          removeClippedSubviews={false}
          alwaysBounceVertical={true}
        >
          <PostDataCard navigation={navigation} postData={data}></PostDataCard>
          {/* This makes the component scrollable all the way to the bottom*/}
          <View style={singlePostStyles.fillerElement}></View>
        </ScrollView>
      ) : (
        <ScrollView
          style={singlePostStyles.postDataContainerVideo}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          removeClippedSubviews={false}
          alwaysBounceVertical={true}
        >
          <PostDataCard navigation={navigation} postData={data}></PostDataCard>
          {/* This makes the component scrollable all the way to the bottom*/}
          <View style={singlePostStyles.fillerElementVideo}></View>
        </ScrollView>
      )}
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
