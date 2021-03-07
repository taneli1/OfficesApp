import React from 'react';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigators/Navigator';
import {MenuProvider} from 'react-native-popup-menu';

const App = () => {
  return (
    <MainProvider>
      <MenuProvider>
        <Navigator />
      </MenuProvider>
    </MainProvider>
  );
};

export default App;
