import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import {Image} from 'react-native-elements';
import PropTypes from 'prop-types';
import {uploadsURL} from '../../utils/Variables';
import Favorite from '../common/Favorite';
import {bigHeader, headerContainer} from '../../styles/BasicComponents';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Dimens} from '../../styles/Dimens';
import {Colors} from '../../styles/Colors';
import ProfileContainer from '../common/ProfileContainer';
import TagList from '../lists/TagList';
import {useFavorites, useTag} from '../../hooks/ApiHooks';
import {MainContext} from '../../contexts/MainContext';
import {Icon} from 'react-native-elements';

// Layout for posts in the home page
const PostDefault = ({navigation, data}) => {
  // Variable to show favorite interaction feedback
  const [runFeedback, setRunFeedback] = useState(false);
  const [postTags, setPostTags] = useState([]);
  const {getTagsForPost} = useTag();
  const [refresh] = useState([]);
  const {favoriteInteraction} = useFavorites();
  const {updtFavorites, setUpdtFavorites} = useContext(MainContext);

  const fetchTags = async () => {
    const res = await getTagsForPost(data.file_id);
    setPostTags(res);
  };

  // Call on longpress, to have alternative way to favorite post
  const longPressInteraction = async () => {
    setRunFeedback(true);
    // Display the feedback at min 0.5sec
    setTimeout(async () => {
      await favoriteInteraction(data.file_id);
      setUpdtFavorites(updtFavorites + 1);
      setTimeout(() => {
        setRunFeedback(false);
      }, 300);
    }, 200);
  };

  useEffect(() => {
    fetchTags();
  }, [refresh]);

  return (
    <View style={s.container}>
      {runFeedback == false && (
        <View style={s.box}>
          <View
            style={[
              headerContainer,
              {marginLeft: 8, position: 'absolute', top: -28},
            ]}
          >
            <Text style={[bigHeader, s.hCont]}>{data.title}</Text>
          </View>
          <View style={s.fav}>
            <Favorite postData={data} />
          </View>
        </View>
      )}

      <TouchableWithoutFeedback
        delayLongPress={300}
        onPress={() => {
          navigation.navigate('Single', {data: data});
        }}
        onLongPress={() => {
          longPressInteraction();
        }}
      >
        {data.thumbnails != undefined && (
          <View style={s.whiteC}>
            {runFeedback == true ? (
              <View style={s.feedbackImage}>
                <Icon
                  name="favorite"
                  size={50}
                  color={Colors.primary}
                  style={{alignSelf: 'center'}}
                ></Icon>
              </View>
            ) : (
              <View style={s.whiteC}>
                <Image
                  resizeMode="contain"
                  style={s.image}
                  source={{uri: uploadsURL + data.thumbnails.w640}}
                  PlaceholderContent={
                    <ActivityIndicator size="large" color={Colors.primary} />
                  }
                ></Image>
              </View>
            )}
          </View>
        )}
      </TouchableWithoutFeedback>
      <View style={s.dataC}>
        <View style={s.profileContainer}>
          <ProfileContainer navigation={navigation} userId={data.user_id} />
        </View>
        <TagList tags={postTags} style={s.tags} navigation={navigation} />
      </View>
    </View>
  );
};

PostDefault.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
};

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 9) / 13.31);
const imageWidth = dimensions.width;

const s = StyleSheet.create({
  container: {
    width: imageWidth - 40,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 60,
    borderRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 8,
  },
  image: {
    transform: [{translateX: -20}],
    height: imageHeight,
    width: imageWidth,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  feedbackImage: {
    transform: [{translateX: -20}],
    width: imageWidth,
    height: imageHeight,
    backgroundColor: Colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hCont: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    fontSize: Dimens.fontSizes.textMedium,
    color: Colors.grey,
    elevation: 1,
    borderColor: 'rgba(255, 255, 255, 0.0)',
    borderWidth: 0.0,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 1,
  },
  fav: {
    position: 'absolute',
    right: 8,
    top: -28,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    borderRadius: 10,
    elevation: 0,
  },
  dataC: {
    backgroundColor: 'rgba(250,250,250, 1)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tags: {},
  profileContainer: {
    transform: [{scaleX: 0.85}, {scaleY: 0.85}, {translateX: -4}],
    padding: 3,
  },
  box: {
    width: imageWidth * 0.9,
  },
  whiteC: {
    width: imageWidth - 40,
    height: imageHeight,
    backgroundColor: Colors.grey,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
});

export default PostDefault;
