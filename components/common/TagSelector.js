import React from 'react';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const TagSelector = () => {
  const [tag, selectTag] = useState(null);
  return (
    <View style={{marginLeft: 10}}>
      <Picker
        selectedValue={tag}
        onValueChange={(itemValue) => selectTag(itemValue)}
      >
        <Picker.Item label="Tag 1" value="1" />
        <Picker.Item label="Tag 2 " value="2" />
        <Picker.Item label="Tag 3 " value="3" />
      </Picker>
    </View>
  );
};

const s = StyleSheet.create({
  item: {},
  picker: {
    borderColor: Colors.primary,
  },
});

export default TagSelector;
