import React, {useContext} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import List from '../components/lists/List';
import GlobalStyles from '../styles/GlobalStyles';
import PropTypes from 'prop-types';
import {useLoadMedia} from '../hooks/ApiHooks';
import {Colors} from '../styles/Colors';
import {Icon} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';

const Home = ({navigation}) => {
  const data = useLoadMedia();
  const {update, setUpdate} = useContext(MainContext);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Icon
        onPress={() => {
          setUpdate(update + 1);
        }}
        name="refresh"
        size={32}
      ></Icon>
      <List navigation={navigation} mediaArray={data} layout="home" />
      <StatusBar style="auto" backgroundColor={Colors.darkGreen} />
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
