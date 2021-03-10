import React, {useContext} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import List from '../components/lists/List';
import GlobalStyles from '../styles/GlobalStyles';
import PropTypes from 'prop-types';
import {useLoadMedia} from '../hooks/ApiHooks';
import {Colors} from '../styles/Colors';
import {Icon} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import {headerContainer} from '../styles/BasicComponents';

const Home = ({navigation}) => {
  const data = useLoadMedia();
  const {update, setUpdate} = useContext(MainContext);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <View style={(headerContainer, {width: 20})}>
        <Icon
          style={{}}
          onPress={() => {
            setUpdate(update + 1);
          }}
          name="refresh"
          size={32}
        ></Icon>
      </View>

      <List navigation={navigation} mediaArray={data} layout="home" />
      <StatusBar style="auto" backgroundColor={Colors.darkGreen} />
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
