import { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';


export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};


export type HomeStackParamList = {
  Home: undefined;
  AddHabit: undefined;
};

export type HistoryStackParamList = {
  History: undefined;
};

export type StatisticsStackParamList = {
  Statistics: undefined;
  StatisticsDetails: { habitId: string };
};

export type SettingsStackParamList = {
  Settings: undefined;
};


export type AppTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  History: NavigatorScreenParams<HistoryStackParamList>;
  Statistics: NavigatorScreenParams<StatisticsStackParamList>;
  Settings: NavigatorScreenParams<SettingsStackParamList>;
};


// LoginScreen
export type LoginScreenNavigationProps = {
  navigation: BottomTabNavigationProp<AuthStackParamList, 'Login'>;
};

// RegisterScreen
export type RegisterScreenNavigationProps = {
  navigation: BottomTabNavigationProp<AuthStackParamList, 'Register'>;
};


// HomeScreen
type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'Home'>,
  BottomTabNavigationProp<AppTabParamList>
>

export type HomeScreenNavigationProps = {
  navigation: HomeScreenNavigationProp;
};

type AddHabitScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'Home'>,
  BottomTabNavigationProp<AppTabParamList>
>

// AddHabitScreen
export type AddHabitScreenNavigationProps = {
  navigation: AddHabitScreenNavigationProp;
};

// HistoryScreen
type HistoryScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HistoryStackParamList, 'History'>,
  BottomTabNavigationProp<AppTabParamList>
>

export type HistoryScreenNavigationProps = {
  navigation: HistoryScreenNavigationProp;
};

// StatisticsScreen
type StatisticsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<StatisticsStackParamList, 'Statistics'>,
  BottomTabNavigationProp<AppTabParamList>
>

export type StatisticsScreenNavigationProps = {
  navigation: StatisticsScreenNavigationProp;
};

// StatisticsDetailsScreen
type StatisticsDetailsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<StatisticsStackParamList, 'StatisticsDetails'>,
  BottomTabNavigationProp<AppTabParamList>
>

type StatisticsDetailsScreenRouteProp = RouteProp<StatisticsStackParamList, 'StatisticsDetails'>

export type StatisticsDetailsScreenNavigationProps = {
  navigation: StatisticsDetailsScreenNavigationProp;
  route: StatisticsDetailsScreenRouteProp;
};

// SettingsScreen
type SettingsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingsStackParamList, 'Settings'>,
  BottomTabNavigationProp<AppTabParamList>
>

export type SettingsScreenNavigationProps = {
  navigation: SettingsScreenNavigationProp;
};







////////////////////////////////////////////////////////////////////////////////////////////////////






/////////////////////////////////////////////

