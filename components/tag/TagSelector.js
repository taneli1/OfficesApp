/* eslint-disable guard-for-in */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../styles/Colors';
import {CheckBox, SearchBar} from 'react-native-elements';
import {
  FlatList,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from 'react-native-elements';
import Tag from '../listitems/Tag';

/*
    Fetch all tags from database first -> Make them to objects. Give all of them: checked = false.
    When an user creates a new tag, add it to TAGS, upload it with the post if it is in
    selected state.
  */
const TAGS = [
  {title: 'minimalistic', checked: false},
  {title: 'ergonomic', checked: false},
  {title: 'colorful', checked: false},
  {title: 'dark', checked: false},
  {title: 'wood', checked: false},
  {title: 'other', checked: false},
];

const TagSelector = () => {
  const [filteredTags, setFilteredTags] = useState(TAGS);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [tagsVisible, setTagsVisible] = React.useState(false);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const tagNames = [];

  if (tagNames.length == 0) {
    for (let i in TAGS) {
      tagNames.push(TAGS[i].title);
    }
  }

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    // Filter the tags based on the query
    const filtered = TAGS.filter(
      (it) => it.title.indexOf(query.toLowerCase()) !== -1
    );

    /*
      Display the option to add a new tag if the user input does not match
      any current tags available
    */
    if (query != '' && !tagNames.includes(query.toLowerCase())) {
      filtered.push({
        title: query.toLowerCase(),
        checked: false,
        newTag: true,
      });
    }
    setFilteredTags(filtered);
  };

  const showTags = () => {
    const array = TAGS.filter((it) => it.checked == true);
    const tagsOnly = []; // Get the titles from checked tags
    array.forEach((it) => tagsOnly.push(it.title));

    setSelectedTags(tagsOnly);
    setTagsVisible(false);
  };

  return (
    <View>
      <SearchBar
        lightTheme={true}
        placeholder="Create new or use existing"
        onFocus={() => setTagsVisible(true)}
        containerStyle={s.container}
        style={{color: Colors.darkGreen}}
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {tagsVisible == true ? (
        <View>
          <ScrollView style={s.scrollView}>
            <FlatList
              scrollEnabled={true}
              contentContainerStyle={s.container}
              data={filteredTags}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.toString + index.toString()}
              renderItem={({item}) => <Option tag={item} />}
            />
          </ScrollView>
          <TouchableHighlight>
            <Button
              buttonStyle={{
                color: Colors.primary,
                backgroundColor: Colors.primary,
              }}
              title="Save"
              onPress={() => showTags()}
            ></Button>
          </TouchableHighlight>
        </View>
      ) : (
        <View>
          <FlatList
            style={{marginTop: 20, marginBottom: 20}}
            scrollEnabled={true}
            contentContainerStyle={s.container}
            horizontal={true}
            data={selectedTags}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <Tag navigation={null} tag={item} />}
          />
        </View>
      )}
    </View>
  );
};

const Option = ({tag}) => {
  const [isChecked, setIsChecked] = React.useState(tag.checked);
  /*
    Set isChecked to have the he same value as the tag passed to this Option.
    React.useState(tag.checked) does not get called every time the flatlist
    items are rendered so the UI checkboxes do not match the state
   */
  if (isChecked != tag.checked) setIsChecked(tag.checked);

  const changeTagState = () => {
    if (tag.newTag) {
      if (!TAGS.includes(tag)) TAGS.push(tag);
    }
    for (const i in TAGS) {
      /*
        Change the checked state of this tag in the TAGS array.
      */
      if (TAGS[i].title == tag.title) {
        TAGS[i].checked = !TAGS[i].checked;
        console.log('Changed ', TAGS[i].title, ' TO ', TAGS[i].checked);
        setIsChecked(TAGS[i].checked);
        break;
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => changeTagState()}>
      <View style={s.optionContainer}>
        <CheckBox
          checkedColor={Colors.primary}
          uncheckedColor={Colors.primary}
          checked={isChecked}
          color={Colors.primary}
          containerStyle={s.checkBox}
        ></CheckBox>
        <Text style={s.option}>{tag.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

Option.propTypes = {
  tag: PropTypes.object,
};

const s = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginLeft: 10,
    marginRight: 10,
  },
  search: {
    color: Colors.red,
    backgroundColor: Colors.white,
  },
  option: {
    padding: 10,
    paddingTop: 15,
    marginLeft: 5,
    paddingBottom: 15,
    color: Colors.primary,
  },
  scrollView: {
    height: 250,
  },
  allWhite: {
    backgroundColor: Colors.white,
    color: Colors.white,
  },
  checkBox: {
    width: 10,
    marginLeft: 2,
    paddingTop: 15,
  },
});

export default TagSelector;
