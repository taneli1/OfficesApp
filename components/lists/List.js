import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import PostDefault from '../listitems/PostDefault';
import ProfilePost from '../listitems/ProfilePost';
import {MainContext} from '../../contexts/MainContext';
import DiscoverDefault from '../listitems/DiscoverDefault';
import {Button, Card, SearchBar} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import Tag from '../listitems/Tag';
import {arrayMaker, randomTag, TagSelector} from '../tag/TagSelector';
import TAGS from '../tag/TagSelector';

/*
  This list component can be used when the app needs a list of posts.
  Takes in the media displayed as a parameter mediaArray.
  Builds the layout with the required layout for the posts.
  Takes in layout prop which defines which post layout is used depending on the screen's name
 */
const List = ({navigation, mediaArray, layout, tags}) => {
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
    const tag1 = randomTag();
    console.log('discover test random tag', tag1);
    const tag2 = randomTag();
    const tag3 = randomTag();
    return (
      <ScrollView>
        <SearchBar placeholder="Type Here..." />
        <Card>
          <Card.Title>{tag1.title}</Card.Title>
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
          <Card.Title>{tag2.title}</Card.Title>
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
          <Card.Title>{tag3.title}</Card.Title>
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

List.propTypes = {
  navigation: PropTypes.object,
  mediaArray: PropTypes.array,
  layout: PropTypes.string,
  tags: PropTypes.array,
};

export default List;
