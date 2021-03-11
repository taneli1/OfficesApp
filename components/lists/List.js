import React, {useContext} from 'react';
import {Dimensions, FlatList, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import PostDefault from '../listitems/PostDefault';
import {MainContext} from '../../contexts/MainContext';
import DiscoverDefault from '../listitems/DiscoverDefault';
import {Button, Card, SearchBar} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {View} from 'react-native';
import {headerContainer, cardLayout} from '../../styles/BasicComponents';
import {Colors} from '../../styles/Colors';
import {Dimens} from '../../styles/Dimens';
import singlePostStyles from '../../styles/SinglePost/SinglePostStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import Input from 'react-select/src/components/Input';
import useSearch from '../../hooks/SearchHooks';

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
  const {update, setUpdate} = useContext(MainContext);
  const {inputs, handleInputChange} = useSearch();

  if (layout === 'home') {
    return (
      <FlatList
        ListHeaderComponent={
          <TouchableOpacity
            onPress={() => {
              setUpdate(update + 1);
            }}
            style={{alignItems: 'center'}}
          >
            <Icon
              style={{marginTop: 15}}
              color={Colors.primary}
              size={32}
              name="refresh"
            ></Icon>
          </TouchableOpacity>
        }
        contentContainerStyle={{paddingBottom: 80}}
        data={mediaArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <PostDefault navigation={navigation} data={item} />
        )}
      />
    );
    /*   } else if (layout === 'profile') {     // Not needed here, profile implements this by itself
    return (
      <FlatList
        contentContainerStyle={{paddingBottom: 80}}
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
    ); */
  } else if (layout === 'discover') {
    return (
      <ScrollView>
        <View style={styles.searchContainer}>
          <SearchBar
            lightTheme={true}
            containerStyle={styles.search}
            placeholder="Search posts by title"
            value={inputs.search}
            onChangeText={(txt) => handleInputChange('search', txt)}
            inputStyle={styles.button}
            // onChangeText={(search) => this.setState({search})}
          />
          <Text
            onPress={() => {
              navigation.navigate('Search', {
                data: mediaArray,
                // title: tagTitle,
                search: inputs,
              });
            }}
            style={[styles.button, {marginTop: 50, marginLeft: 6}]}
          >
            Go!
          </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <TouchableOpacity
              style={{alignSelf: 'flex-start'}}
              onPress={() => {
                navigation.navigate('Discover More', {data: mediaArray});
              }}
            >
              <Text style={styles.tagHeader}>{tagTitle}</Text>
            </TouchableOpacity>
            <Text
              onPress={() => {
                navigation.navigate('Discover More', {data: mediaArray});
              }}
              style={styles.button}
            >
              See more &gt;
            </Text>
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={<View style={{marginLeft: 30}} />}
            horizontal={true}
            data={mediaArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <DiscoverDefault navigation={navigation} data={item} />
            )}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.textContainer}>
            <TouchableOpacity
              style={{alignSelf: 'flex-start'}}
              onPress={() => {
                navigation.navigate('Discover More', {data: mediaArray2});
              }}
            >
              <Text style={styles.tagHeader}>{tagTitle2}</Text>
            </TouchableOpacity>
            <Text
              onPress={() => {
                navigation.navigate('Discover More', {data: mediaArray2});
              }}
              style={styles.button}
            >
              See more &gt;
            </Text>
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={<View style={{marginLeft: 30}} />}
            horizontal={true}
            data={mediaArray2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <DiscoverDefault navigation={navigation} data={item} />
            )}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.textContainer}>
            <TouchableOpacity
              style={{alignSelf: 'flex-start'}}
              onPress={() => {
                navigation.navigate('Discover More', {data: mediaArray3});
              }}
            >
              <Text style={styles.tagHeader}>{tagTitle3}</Text>
            </TouchableOpacity>
            <Text
              onPress={() => {
                navigation.navigate('Discover More', {data: mediaArray3});
              }}
              style={styles.button}
            >
              See more &gt;
            </Text>
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={<View style={{marginLeft: 30}} />}
            style={{paddingBottom: 50}}
            horizontal={true}
            data={mediaArray3}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <DiscoverDefault navigation={navigation} data={item} />
            )}
          />
        </View>
      </ScrollView>
    );
  } else if (layout === 'discoverMore') {
    return (
      <FlatList
        contentContainerStyle={{paddingBottom: 80}}
        data={mediaArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <PostDefault navigation={navigation} data={item} />
        )}
      />
    );
  } else if (layout === 'search') {
    return (
      <FlatList
        contentContainerStyle={{paddingBottom: 80}}
        data={mediaArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <PostDefault navigation={navigation} data={item} />
        )}
      />
    );
  }
};

const styles = StyleSheet.create({
  searchContainer: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    alignItems: 'flex-start',
    marginTop: 50,
  },
  textContainer: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagHeader: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    borderColor: Colors.white,
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 16,
    marginLeft: 15,
  },
  button: {
    color: Colors.primary,
    fontSize: 16,
    marginRight: 25,
  },
  search: {
    width: Dimensions.get('window').width - 60,
    marginLeft: 20,
    marginTop: 50,
  },
});

List.propTypes = {
  navigation: PropTypes.object,
  mediaArray: PropTypes.array,
  layout: PropTypes.string,
  tags: PropTypes.array,
};

export default List;
