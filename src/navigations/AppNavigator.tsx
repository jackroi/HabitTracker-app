import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { t } from 'i18n-js';

import {
  HomeScreen,
  RemindersScreen,
  StatisticsScreen,
  SettingsScreen
} from '../screens';

import { AppTabParamList } from '../types/types';


const getTabBarLabel = (routeName: keyof AppTabParamList): string => {
  switch (routeName) {
    case 'Home':
      return t('homeScreenTitle');

    case 'Reminders':
      return t('remindersScreenTitle');

    case 'Statistics':
      return t('statisticsScreenTitle');

    case 'Settings':
      return t('settingsScreenTitle');

    default:
      const _exhaustiveCheck: never = routeName;
      return _exhaustiveCheck;
  }
};


const TabNavigator = createBottomTabNavigator<AppTabParamList>();

function AppNavigator() {
  return (
    <TabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // TODO probabilmente passare al metodo non dinamico di settare le icone
          type UsedIcons =
            | 'home'
            | 'notifications'
            | 'bar-chart'
            | 'settings';

          let iconName: UsedIcons;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Reminders') {
            iconName = 'notifications';
          } else if (route.name === 'Statistics') {
            iconName = 'bar-chart';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          } else {
            throw new Error('Invalid route name');
          }

          return <MaterialIcons name={iconName} size={size} color={color} />
        },
        tabBarLabel: getTabBarLabel(route.name),
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',  // TODO theme colors
        inactiveTintColor: 'gray',
      }}
    >
      <TabNavigator.Screen name="Home" component={HomeScreen} />
      <TabNavigator.Screen name="Reminders" component={RemindersScreen} />
      <TabNavigator.Screen name="Statistics" component={StatisticsScreen} />
      <TabNavigator.Screen name="Settings" component={SettingsScreen} />
    </TabNavigator.Navigator>
  );
}

export default AppNavigator;
