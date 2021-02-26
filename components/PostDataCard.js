import React from 'react';
import PropTypes from 'prop-types';
import {Card, Text} from 'react-native-elements';
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

const PostDataCard = ({navigation, postData}) => {
  return (
    <View removeClippedSubviews={false}>
      <View style={headerContainer}>
        <Text style={bigHeader}>{postData.title}</Text>
      </View>

      <Card containerStyle={[cardLayout, {borderColor: Colors.primary}]}>
        <View style={styles.topContainer}>
          <ProfileContainer
            navigation={navigation}
            data={postData}
          ></ProfileContainer>
          <View style={styles.favoriteContainer}>
            <Favorite postData={null}></Favorite>
          </View>
        </View>

        <Text style={styles.description}>
          Post description goes here. Post description goes here. Post
          description goes here. Post description goes here. Post description
          goes here. Post description goes here. Post description goes here.
        </Text>

        <View>
          <CommentList
            containerStyle={{marginLeft: 10}}
            comments={[{2: 2}, {2: 2}, {2: 2}]}
          ></CommentList>
          <TouchableOpacity>
            <Icon
              style={{marginTop: 10}}
              size={32}
              color={Colors.primary}
              name="add-comment"
            ></Icon>
          </TouchableOpacity>
        </View>

        <View style={styles.tagContainer}>
          <TagList style={{marginLeft: 30}} tags={[5, 3]} />
        </View>

        <Card.Divider style={styles.divider}></Card.Divider>

        <View>
          <LinkList items={[0, 2]}></LinkList>
        </View>

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
