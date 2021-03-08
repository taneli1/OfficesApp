import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import ProfileContainer from '../common/ProfileContainer';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {MainContext} from '../../contexts/MainContext';
import {Icon} from 'react-native-elements';
import {useComments} from '../../hooks/ApiHooks';
import {Alert} from 'react-native';

/*
  Single component for the CommentList, renders
  the user and the comment left by them.
*/
const CommentBlock = ({navigation, data}) => {
  const {user} = useContext(MainContext);
  const {updateSinglePostData, setUpdateSinglePostData} = useContext(
    MainContext
  );

  const {deleteComment} = useComments();

  const doDelete = async () => {
    const res = await deleteComment(data.comment_id);
    if (res) Alert.alert('Comment deleted');
    else Alert.alert('Could not delete comment');
    setUpdateSinglePostData(!updateSinglePostData);
  };

  return (
    <View style={s.container}>
      <ProfileContainer
        style={s.profile}
        navigation={navigation}
        userId={data.user_id}
      />
      <Text style={s.text}>{data.comment}</Text>
      <View style={s.center}>
        {data.user_id === user.user_id && (
          <Icon
            onPress={() => {
              doDelete();
            }}
            name="delete"
            size={24}
          ></Icon>
        )}
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    marginLeft: 0,
    flexDirection: 'row',
    transform: [{scaleX: 0.85}, {scaleY: 0.85}, {translateX: -16}],
  },
  profile: {
    alignSelf: 'center',
  },
  text: {
    marginLeft: 8,
    flex: 1,
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  center: {
    alignSelf: 'center',
  },
});

CommentBlock.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
};

export default CommentBlock;
