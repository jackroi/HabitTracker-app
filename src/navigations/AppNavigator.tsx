import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { HomeScreen, SettingsScreen } from '../screens';

import { TabParamList } from '../types/types';


const TabNavigator = createBottomTabNavigator<TabParamList>();

function AppNavigator() {
  return (
    <TabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          type UsedIcons =
            | 'ios-information-circle'
            | 'ios-information-circle-outline'
            | 'ios-list-circle'
            | 'ios-list';

          let iconName: UsedIcons;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list-circle' : 'ios-list';
          } else {
            throw new Error('Invalid route name');
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <TabNavigator.Screen name="Home" component={HomeScreen} />
      <TabNavigator.Screen name="Settings" component={SettingsScreen} />
    </TabNavigator.Navigator>
  );
}

export default AppNavigator;
