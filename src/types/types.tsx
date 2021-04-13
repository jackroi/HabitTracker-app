import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// TabNavigator type definitions
export type TabParamList = {
  Home: undefined;
  Settings: undefined;
};

// HomeScreen
type HomeScreenNavigationProp = BottomTabNavigationProp<
  TabParamList,
  'Home'
>;

export type HomeScreenNavigationProps = {
  navigation: HomeScreenNavigationProp;
};

// SettingsScreen
type SettingsScreenNavigationProp = BottomTabNavigationProp<
  TabParamList,
  'Home'
>;

export type SettingsScreenNavigationProps = {
  navigation: SettingsScreenNavigationProp;
};

////////////////////////////////////////////////////////////////////////////////////////////////////

// StackNavigator type definitions
export type StackParamList = {
  Login: undefined;
  Register: undefined;
};

// LoginScreen
type LoginScreenNavigationProp = BottomTabNavigationProp<
  StackParamList,
  'Login'
>;

export type LoginScreenNavigationProps = {
  navigation: LoginScreenNavigationProp;
};

// RegisterScreen
type RegisterScreenNavigationProp = BottomTabNavigationProp<
  StackParamList,
  'Register'
>;

export type RegisterScreenNavigationProps = {
  navigation: RegisterScreenNavigationProp;
};
