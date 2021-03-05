/* eslint-disable guard-for-in */
import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Card, Input, Text} from 'react-native-elements';
import {View} from 'react-native';
import {
  bigHeader,
  headerContainer,
  cardLayout,
} from '../styles/BasicComponents';
import {StyleSheet} from 'react-native';
import ProfileContainer from './common/ProfileContainer';
import Favorite from './common/Favorite';
import TagList from './lists/TagList';
import {Colors} from '../styles/Colors';
import LinkList from './lists/LinkList';
import CommentList from './lists/CommentList';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTag, useComments} from '../hooks/ApiHooks';

/*
  Layout for the single screen card, without the image of the post.
*/
const PostDataCard = ({navigation, postData}) => {
  /**
    DesciptionData is saved as an array to the DB.

    First index of this array contains a string, which is the description
    itself.

    Second index contains the itemLinkArray, which in turn
    consist of all the ItemLinkObjects the user added to the post.
    @see LinkCreator
  */
  const descriptionData = JSON.parse(postData.description);
  const postDescription = descriptionData[0];
  const postLinkData = descriptionData[1];

  const [postTags, setPostTags] = useState([]);
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState([false]);
  const [commentWrite, setCommentWrite] = useState(false);
  let commentInput = '';
  const {getTagsForPost} = useTag();
  const {getPostComments, postComment} = useComments();

  const fetchTags = async () => {
    const res = await getTagsForPost(postData.file_id);
    setPostTags(res);
  };

  const fetchCommentData = async () => {
    const res = await getPostComments(postData.file_id);
    setComments(res);
  };

  const comment = async () => {
    setCommentWrite(false);
    await postComment(commentInput.toString(), postData.file_id);
    setRefresh(!refresh);
  };

  const changeInput = (txt) => {
    commentInput = txt;
    console.log(commentInput);
  };

  useEffect(() => {
    fetchTags();
    fetchCommentData();
  }, [refresh]);

  return (
    <View removeClippedSubviews={false}>
      <View style={headerContainer}>
        <Text style={bigHeader}>{postData.title}</Text>
      </View>

      <Card containerStyle={[cardLayout, {borderColor: Colors.primary}]}>
        <View style={styles.topContainer}>
          <ProfileContainer
            navigation={navigation}
            userId={postData.user_id}
          ></ProfileContainer>
          <View style={styles.favoriteContainer}>
            <Favorite
              containerStyle={{padding: 30}}
              postData={postData}
            ></Favorite>
          </View>
        </View>

        <Text style={styles.description}>{postDescription}</Text>

        <View>
          <CommentList
            containerStyle={{marginLeft: 10}}
            commentData={comments}
            navigation={navigation}
          ></CommentList>
          {commentWrite ? (
            <View
              style={{marginTop: 20, flexDirection: 'row', flexWrap: 'wrap'}}
            >
              <Input
                id="comment"
                containerStyle={{width: 200}}
                placeholder="comment"
                onChangeText={(txt) => changeInput(txt)}
              ></Input>
              <TouchableOpacity onPress={() => comment()}>
                <Icon
                  style={{marginTop: 10}}
                  size={32}
                  color={Colors.primary}
                  name="save"
                ></Icon>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCommentWrite(false)}>
                <Icon
                  style={{marginTop: 10, marginLeft: 10}}
                  size={32}
                  color={Colors.primary}
                  name="cancel"
                ></Icon>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setCommentWrite(true)}>
              <Icon
                style={{marginTop: 10, marginLeft: 10}}
                size={32}
                color={Colors.primary}
                name="add-comment"
              ></Icon>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.tagContainer}>
          <TagList style={{marginLeft: 30}} tags={postTags} />
        </View>

        <Card.Divider style={styles.divider}></Card.Divider>

        {postLinkData.size != 0 && (
          <View>
            <Text style={{marginLeft: 10, color: Colors.primary}}>
              See links to items:
            </Text>
            <LinkList items={postLinkData}></LinkList>
          </View>
        )}

        <Card.Divider style={[styles.divider, {marginTop: 20}]}></Card.Divider>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    height: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  favoriteContainer: {
    paddingTop: 8,
  },
  tagContainer: {
    alignItems: 'center',
    padding: 8,
    marginTop: 20,
  },
  description: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    color: Colors.grey,
  },
});

PostDataCard.propTypes = {
  navigation: PropTypes.object,
  postData: PropTypes.object,
};

export default PostDataCard;
