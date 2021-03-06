/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {MainContext} from '../contexts/MainContext';
import {Icon} from 'react-native-elements';
import Login from '../views/Login';
import Home from '../views/Home';
import Single from '../views/Single';
import Profile from '../views/Profile';
import Upload from '../views/Upload';
import Discover from '../views/Discover';
import {Colors} from '../styles/Colors';
import EditPost from '../views/EditPost';
import DiscoverMore from '../views/DiscoverMore';
import Search from '../views/Search';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: Colors.primary,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Discover':
              iconName = 'collections';
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
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Upload" component={Upload} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn, isUsingAnonymously} = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn || isUsingAnonymously ? (
        <>
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
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Discover More" component={DiscoverMore} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Edit Post" component={EditPost} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={({route}) => ({
              headerShown: false,
            })}
          />
        </>
      )}
    </Stack.Navigator>
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
