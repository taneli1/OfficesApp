import React, {useEffect, useState} from 'react';
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
import {useTag} from '../../hooks/ApiHooks';

// Layout for posts in the home page
const PostDefault = ({navigation, data}) => {
  const [postTags, setPostTags] = useState([]);
  const {getTagsForPost} = useTag();
  const [refresh, setRefresh] = useState([]);

  const fetchTags = async () => {
    const res = await getTagsForPost(data.file_id);
    setPostTags(res);
  };

  useEffect(() => {
    fetchTags();
  }, [refresh]);

  return (
    <View style={s.container}>
      <View
        style={[
          headerContainer,
          {marginLeft: 8, position: 'absolute', top: -25},
        ]}
      >
        <Text style={[bigHeader, s.hCont]}>{data.title}</Text>
      </View>
      <View style={s.fav}>
        <Favorite postData={data} />
      </View>

      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('Single', {data: data});
        }}
      >
        {data.thumbnails != undefined && (
          <Image
            resizeMode="stretch"
            style={s.image}
            source={{uri: uploadsURL + data.thumbnails.w640}}
            PlaceholderContent={
              <ActivityIndicator size="large" color={Colors.primary} />
            }
          ></Image>
        )}
      </TouchableWithoutFeedback>
      <View style={s.dataC}>
        <ProfileContainer navigation={navigation} userId={data.user_id} />
        <TagList tags={postTags} style={s.tags} />
      </View>
    </View>
  );
};

PostDefault.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
};

const s = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.9,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
    overflow: 'visible',
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 0.5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 8,
  },
  image: {
    width: Dimensions.get('window').width * 0.9,
    height: 200,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  hCont: {
    fontSize: Dimens.fontSizes.textMedium,
    borderColor: Colors.primary,
    borderWidth: 0.5,
  },
  fav: {
    position: 'absolute',
    right: 8,
    top: -22,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.grey,
    borderWidth: 0.5,
    elevation: Dimens.elevations.baseElevation,
  },
  dataC: {
    width: '100%',
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tags: {},
});

export default PostDefault;
