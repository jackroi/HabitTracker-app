import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from 'i18n-js';

import { LoginScreen, RegisterScreen } from '../screens';

import { AuthStackParamList } from '../types/types';


const getHeaderTitle = (routeName: keyof AuthStackParamList): string => {
  switch (routeName) {
    case 'Login':
      return t('loginScreenTitle');

    case 'Register':
      return t('registerScreenTitle');

    default:
      const _exhaustiveCheck: never = routeName;
      return _exhaustiveCheck;
  }
}


const StackNavigator = createStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <StackNavigator.Navigator
      screenOptions={({ route }) => ({
        headerTitle: getHeaderTitle(route.name),
        detachPreviousScreen: false,
      })}
      // detachInactiveScreens={false}
    >
      <StackNavigator.Screen name="Login" component={LoginScreen} />
      <StackNavigator.Screen name="Register" component={RegisterScreen} />
    </StackNavigator.Navigator>
  );
}

export default AuthNavigator;
