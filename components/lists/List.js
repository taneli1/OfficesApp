import React, {useContext} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import PostDefault from '../listitems/PostDefault';
import ProfilePost from '../listitems/ProfilePost';
import {MainContext} from '../../contexts/MainContext';
import DiscoverDefault from '../listitems/DiscoverDefault';
import {Button, Card, SearchBar} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

/*
  This list component can be used when the app needs a list of posts.
  Takes in the media displayed as a parameter mediaArray.
  Builds the layout with the required layout for the posts.
  Takes in layout prop which defines which post layout is used depending on the screen's name
 */
const List = ({navigation, mediaArray, layout}) => {
  const {user} = useContext(MainContext);

  if (layout === 'home') {
    return (
      <FlatList
        data={mediaArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <PostDefault navigation={navigation} data={item} />
        )}
      />
    );
  } else if (layout === 'profile') {
    return (
      <FlatList
        style={styles.usersPostsList}
        data={mediaArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ProfilePost
            navigation={navigation}
            data={item}
            isUsersPost={item.user_id === user.user_id}
          />
        )}
      />
    );
  } else if (layout === 'discover') {
    return (
      <ScrollView>
        <SearchBar placeholder="Type Here..." />
        <Card>
          <Card.Title>Tag 1</Card.Title>
          <Button tittle="See more" containerViewStyle={{height: '10%'}}>
            See more
          </Button>
          <FlatList
            horizontal={true}
            data={mediaArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <DiscoverDefault navigation={navigation} data={item} />
            )}
          />
        </Card>
        <Card>
          <Card.Title>Tag 2</Card.Title>
          <Button tittle="See more">See more</Button>
          <FlatList
            horizontal={true}
            data={mediaArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <DiscoverDefault navigation={navigation} data={item} />
            )}
          />
        </Card>
        <Card>
          <Card.Title>Tag 3</Card.Title>
          <Button tittle="See more">See more</Button>
          <FlatList
            horizontal={true}
            data={mediaArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <DiscoverDefault navigation={navigation} data={item} />
            )}
          />
        </Card>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  usersPostsList: {
    height: 360,
  },
});

List.propTypes = {
  navigation: PropTypes.object,
  mediaArray: PropTypes.array,
  layout: PropTypes.string,
};

export default List;
