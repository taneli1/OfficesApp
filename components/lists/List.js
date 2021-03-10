import React, {useContext} from 'react';
import {FlatList} from 'react-native';
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
const List = ({
  navigation,
  mediaArray,
  mediaArray2,
  mediaArray3,
  layout,
  tagTitle,
  tagTitle2,
  tagTitle3,
  tags,
}) => {
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
    return (
      <ScrollView>
        <SearchBar placeholder="Type Here..." />

        <Card>
          <Card.Title>{tagTitle}</Card.Title>

          <FlatList
            horizontal={true}
            data={mediaArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <DiscoverDefault navigation={navigation} data={item} />
            )}
          />
          <Button
            title="See more"
            onPress={() => {
              navigation.navigate('Discover More', {data: mediaArray});
            }}
          >
            See more
          </Button>
        </Card>
        <Card>
          <Card.Title>{tagTitle2}</Card.Title>
          <FlatList
            horizontal={true}
            data={mediaArray2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <DiscoverDefault navigation={navigation} data={item} />
            )}
          />
          <Button
            title="See more"
            onPress={() => {
              navigation.navigate('Discover More', {data: mediaArray2});
            }}
          >
            See more
          </Button>
        </Card>
        <Card>
          <Card.Title>{tagTitle3}</Card.Title>
          <FlatList
            horizontal={true}
            data={mediaArray3}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <DiscoverDefault navigation={navigation} data={item} />
            )}
          />
          <Button
            title="See more"
            onPress={() => {
              navigation.navigate('Discover More', {data: mediaArray3});
            }}
          >
            See more
          </Button>
        </Card>
      </ScrollView>
    );
  } else if (layout === 'discoverMore') {
    return (
      <FlatList
        data={mediaArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <PostDefault navigation={navigation} data={item} />
        )}
      />
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
