import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// TabNavigator type definitions
export type TabParamList = {
  Home: undefined;
  History: undefined;
  Statistics: undefined;
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

// HistoryScreen
type HistoryScreenNavigationProp = BottomTabNavigationProp<
  TabParamList,
  'History'
>;

export type HistoryScreenNavigationProps = {
  navigation: HistoryScreenNavigationProp;
};

// StatisticsScreen
type StatisticsScreenNavigationProp = BottomTabNavigationProp<
  TabParamList,
  'Statistics'
>;

export type StatisticsScreenNavigationProps = {
  navigation: SettingsScreenNavigationProp;
};

// SettingsScreen
type SettingsScreenNavigationProp = BottomTabNavigationProp<
  TabParamList,
  'Settings'
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








/////////////////////////////////////////////


export enum HabitState {
  COMPLETED,
  SKIPPED,
  NOT_COMPLETED
}
