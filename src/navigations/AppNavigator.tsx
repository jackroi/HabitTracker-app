import * as React from 'react';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { t } from 'i18n-js';

import {
  HomeScreen,
  StatisticsScreen,
  RemindersScreen,
  SettingsScreen
} from '../screens';

import { AppTabParamList } from '../types/types';
import { getTheme } from '../styles/themes';


const TabNavigator = createBottomTabNavigator<AppTabParamList>();

function AppNavigator() {

  const theme = getTheme(useColorScheme());

  return (
    <TabNavigator.Navigator
      tabBarOptions={{
        activeTintColor: theme.colorActiveTab,
        inactiveTintColor: theme.colorInactiveTab,
      }}
    >
      <TabNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('homeScreenTitle'),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <TabNavigator.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          tabBarLabel: t('statisticsScreenTitle'),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bar-chart" color={color} size={size} />
          ),
        }}
      />

      <TabNavigator.Screen
        name="Reminders"
        component={RemindersScreen}
        options={{
          tabBarLabel: t('remindersScreenTitle'),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notifications" color={color} size={size} />
          ),
        }}
      />

      <TabNavigator.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: t('settingsScreenTitle'),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );
}

export default AppNavigator;
