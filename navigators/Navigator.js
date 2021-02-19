import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {MainContext} from '../contexts/MainContext';
import {Icon} from 'react-native-elements';
import PlaceHolder from '../views/PlaceHolder';
import Home from '../views/Home';
import Single from '../views/Single';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Discover':
              iconName = 'account-box';
              break;
            case 'Upload':
              iconName = 'cloud-upload';
              break;
            case 'Profile':
              iconName = 'account-box';
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Discover" component={PlaceHolder} />
      <Tab.Screen name="Upload" component={PlaceHolder} />
      <Tab.Screen name="Profile" component={PlaceHolder} />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabScreen}
          options={({route}) => ({
            headerTitle: getFocusedRouteNameFromRoute(route),
          })}
        />
        <Stack.Screen
          name="Single"
          component={Single}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
