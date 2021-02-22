import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../styles/Colors';
import {Icon} from 'react-native-elements';
import {Dimens} from '../../styles/Dimens';
import {StyleSheet} from 'react-native';

// Parameter object postData, get favorites count with that
const Favorite = ({postData}) => {
  return (
    <TouchableOpacity>
      <View style={styles.containerHeart}>
        <Icon color={Colors.red} name="favorite"></Icon>

        <Text style={styles.hearts}>26</Text>
      </View>
    </TouchableOpacity>
  );
};

Favorite.propTypes = {
  postData: PropTypes.object,
};

const styles = StyleSheet.create({
  hearts: {
    fontSize: Dimens.fontSizes.textMedium,
    alignSelf: 'baseline',
    marginLeft: 5,
  },
  containerHeart: {
    flexDirection: 'row',
    padding: 4,
    marginTop: 8,
  },
});

export default Favorite;
