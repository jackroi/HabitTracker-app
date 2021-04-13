import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen, RegisterScreen } from '../screens';

import { StackParamList } from '../types/types';


const StackNavigator = createStackNavigator<StackParamList>();

function AuthNavigator() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="Login" component={LoginScreen} />
      <StackNavigator.Screen name="Register" component={RegisterScreen} />
    </StackNavigator.Navigator>
  );
}

export default AuthNavigator;
