import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import PostDefault from '../listitems/PostDefault';
import ProfilePost from '../listitems/ProfilePost';
import {MainContext} from '../../contexts/MainContext';
import DiscoverDefault from '../listitems/DiscoverDefault';
import {Button, Card, SearchBar} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {View} from 'react-native';
import {Text} from 'react-native';
import {
  bigHeader,
  headerContainer,
  cardLayout,
} from '../../styles/BasicComponents';
import {Colors} from '../../styles/Colors';
import {Dimens} from '../../styles/Dimens';
import {StyleSheet} from 'react-native';
import singlePostStyles from '../../styles/SinglePost/SinglePostStyles';

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
      <View>
        <SearchBar
          containerStyle={s.search}
          inputContainerStyle={s.searchInput}
          placeholder="Search posts by title"
        />
        <View containerStyle={[headerContainer, s.aaa]}>
          {/* <Text style={[bigHeader, s.aaa]}>Check posts with these tags</Text> */}
        </View>
        <ScrollView>
          <Card containerStyle={cardLayout}>
            <View style={s.contentContainer}>
              <Card.Title style={s.tag}>{tagTitle}</Card.Title>
              <Button
                buttonStyle={s.button}
                title="See more"
                onPress={() => {
                  navigation.navigate('Discover More', {
                    data: mediaArray,
                    title: tagTitle,
                  });
                }}
              >
                See more
              </Button>
            </View>

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
            <Card.Title>{tagTitle2}</Card.Title>
            <Button
              title="See more"
              onPress={() => {
                navigation.navigate('Discover More', {data: mediaArray2});
              }}
            >
              See more
            </Button>
            <FlatList
              horizontal={true}
              data={mediaArray2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <DiscoverDefault navigation={navigation} data={item} />
              )}
            />
          </Card>
          <Card>
            <Card.Title>{tagTitle3}</Card.Title>
            <Button
              title="See more"
              onPress={() => {
                navigation.navigate('Discover More', {data: mediaArray3});
              }}
            >
              See more
            </Button>
            <FlatList
              horizontal={true}
              data={mediaArray3}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <DiscoverDefault navigation={navigation} data={item} />
              )}
            />
          </Card>
          <View style={singlePostStyles.fillerElement}></View>
        </ScrollView>
      </View>
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

const s = StyleSheet.create({
  search: {
    margin: 20,
    backgroundColor: Colors.primary,
    color: Colors.white,
    borderRadius: 6,
  },
  searchInput: {
    backgroundColor: Colors.white,
    color: Colors.primary,
  },
  aaa: {
    textAlign: 'justify',
  },
  maincontainer: {
    flexDirection: 'row',
    alignSelf: 'baseline',
  },
  tag: {
    // paddingBottom: 6,
    // paddingTop: 6,
    flex: 1,
    backgroundColor: Colors.primary,
    color: Colors.white,
    padding: 5,
    borderRadius: 6,
    fontSize: Dimens.fontSizes.textMedium,
    marginRight: 20,
    // paddingRight: 10,
    // paddingLeft: 10,
  },
  button: {
    flex: 2,
    backgroundColor: Colors.primary,
    color: Colors.white,
    padding: 5,
    borderRadius: 6,
    fontSize: Dimens.fontSizes.textSmall,
    marginLeft: 30,
    paddingRight: 10,
    paddingLeft: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    alignSelf: 'baseline',
    // margin: 10,
    // padding: 10,
    // borderWidth: 1,
    // borderRadius: 10,
    // borderColor: 'gray',
    // backgroundColor: 'white',
  },
});
List.propTypes = {
  navigation: PropTypes.object,
  mediaArray: PropTypes.array,
  layout: PropTypes.string,
  tags: PropTypes.array,
};

export default List;
