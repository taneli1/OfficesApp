import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import {Input} from 'react-native-elements';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import {Dimensions} from 'react-native';
import {Colors} from '../../styles/Colors';
import PropTypes from 'prop-types';
import {MainContext} from '../../contexts/MainContext';

/*
  Has the link items the user created inside

  Objects inside the staticLinks array as :
  {itemName: String, itemLink: String}.

  These objects are saved in the posts description as json objects
  with the description itself.
*/
let staticLinkObjects = [];

/*
  Provides the functionality to the users to link different
  items in their shown post, so other users of the app can
  easily get stuff they find cool looking for their own purposes.
*/
const LinkCreator = () => {
  const newObjectTemplate = {itemName: '', itemLink: ''};
  /*
    Use MainContext here since could not get any other context to work

    Used as a way for LinkCreator and LinkObjects to communicate the need
    for UI updates
   */
  const {refreshItemLinks, setRefreshItemLinks} = useContext(MainContext);
  const [renderCopyArr, setRenderCopyArr] = useState([]);

  const addToArray = () => {
    staticLinkObjects = [...staticLinkObjects, newObjectTemplate];
    setRefreshItemLinks(refreshItemLinks + 1);
  };

  useEffect(() => {
    setRenderCopyArr(staticLinkObjects);
  }, [refreshItemLinks]);

  // Renders linkObjects depending on how many the user wants to create
  return (
    <View style={s.linkCreator}>
      <FlatList
        scrollEnabled={true}
        contentContainerStyle={s.container}
        data={renderCopyArr}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => <LinkObject linkObjectIndex={index} />}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          addToArray();
        }}
        style={{
          width: 100,
          alignContent: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <View style={{alignSelf: 'center'}}>
          <Text style={{color: Colors.primary}}>Add Link</Text>
          <Icon color={Colors.primary} size={40} name="add"></Icon>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const LinkObject = ({linkObjectIndex}) => {
  const {refreshItemLinks, setRefreshItemLinks} = useContext(MainContext);

  console.log('Index of rendered linkObject: ', linkObjectIndex);

  // Set the values the user types to correct object/field
  const setLinkObjectField = (field, text, index) => {
    console.log(text);
    const old = staticLinkObjects[index];
    const updated = {
      ...old,
      // Drop https/ from the links since we add it in later
      [field]: text.split('Https://').join('').split('https://').pop(),
    };
    const arrClone = [...staticLinkObjects];
    arrClone[index] = updated;
    staticLinkObjects = arrClone;
    setRefreshItemLinks(refreshItemLinks + 1);
  };

  const getObjectName = (index) => {
    console.log('Objname, ', staticLinkObjects[index]);
    const value = staticLinkObjects[index].itemName;
    return value !== undefined ? value : '';
  };

  const getObjectLink = (index) => {
    console.log('Objname, ', staticLinkObjects[index]);
    const value = staticLinkObjects[index].itemLink;
    return value !== undefined ? value : '';
  };

  const removeLinkObject = (index) => {
    staticLinkObjects.splice(index, 1);
    setRefreshItemLinks(refreshItemLinks + 1);
  };

  return (
    <View style={s.linkObjectContainer}>
      <View style={s.inputContainer}>
        <Input
          onChangeText={(text) => {
            setLinkObjectField('itemName', text, linkObjectIndex);
          }}
          value={getObjectName(linkObjectIndex)}
          style={s.input}
          title="itemName"
          placeholder="Item name"
          inputContainerStyle={{borderColor: Colors.primary}}
        ></Input>
        <Input
          onChangeText={(text) => {
            setLinkObjectField('itemLink', text, linkObjectIndex);
          }}
          value={getObjectLink(linkObjectIndex)}
          style={s.input}
          title="itemLink"
          placeholder="Link to a website"
          inputContainerStyle={{borderColor: Colors.primary}}
        ></Input>
      </View>
      <View style={{alignSelf: 'center'}}>
        <Icon
          onPress={() => removeLinkObject(linkObjectIndex)}
          color={Colors.primary}
          size={32}
          name="delete"
        ></Icon>
      </View>
    </View>
  );
};

LinkObject.propTypes = {
  linkObjectIndex: PropTypes.number,
};

const s = StyleSheet.create({
  container: {},
  linkCreator: {
    marginStart: 20,
    marginEnd: 20,
    alignItems: 'center',
  },
  linkObjectContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
  },
  input: {
    width: 200,
  },
  inputContainer: {
    width: Dimensions.get('window').width * 0.6,
  },
});

// Returns the array of the user created linkObjects
const getCreatedLinkObjects = () => {
  return staticLinkObjects;
};

export {LinkCreator, getCreatedLinkObjects};
