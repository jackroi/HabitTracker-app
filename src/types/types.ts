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
  UpdateHabit: { habitId: string };
  AddReminder: { habitId: string };
};

export type RemindersStackParamList = {
  Reminders: undefined;
};

export type StatisticsStackParamList = {
  Statistics: undefined;
  StatisticsDetails: { habitId: string };
};

export type SettingsStackParamList = {
  Settings: undefined;
  Account: undefined;
  About: undefined;
  HabitArchive: undefined;
};


export type AppTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Statistics: NavigatorScreenParams<StatisticsStackParamList>;
  Reminders: NavigatorScreenParams<RemindersStackParamList>;
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

// AddHabitScreen
type AddHabitScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'AddHabit'>,
  BottomTabNavigationProp<AppTabParamList>
>

export type AddHabitScreenNavigationProps = {
  navigation: AddHabitScreenNavigationProp;
};

// UpdateHabitScreen
type UpdateHabitScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'UpdateHabit'>,
  BottomTabNavigationProp<AppTabParamList>
>

type UpdateHabitScreenRouteProp = RouteProp<HomeStackParamList, 'UpdateHabit'>

export type UpdateHabitScreenNavigationProps = {
  navigation: UpdateHabitScreenNavigationProp;
  route: UpdateHabitScreenRouteProp;
};

// AddReminderScreen
type AddReminderScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'AddReminder'>,
  BottomTabNavigationProp<AppTabParamList>
>

type AddReminderScreenRouteProp = RouteProp<HomeStackParamList, 'AddReminder'>

export type AddReminderScreenNavigationProps = {
  navigation: AddReminderScreenNavigationProp;
  route: AddReminderScreenRouteProp;
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


// RemindersScreen
type RemindersScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RemindersStackParamList, 'Reminders'>,
  BottomTabNavigationProp<AppTabParamList>
>

export type RemindersScreenNavigationProps = {
  navigation: RemindersScreenNavigationProp;
};


// SettingsScreen
type SettingsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingsStackParamList, 'Settings'>,
  BottomTabNavigationProp<AppTabParamList>
>

export type SettingsScreenNavigationProps = {
  navigation: SettingsScreenNavigationProp;
};


// AccountScreen
type AccountScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingsStackParamList, 'Account'>,
  BottomTabNavigationProp<AppTabParamList>
>

type AccountScreenRouteProp = RouteProp<SettingsStackParamList, 'Account'>

export type AccountScreenNavigationProps = {
  navigation: AccountScreenNavigationProp;
  route: AccountScreenRouteProp;
};


// AboutScreen
type AboutScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingsStackParamList, 'About'>,
  BottomTabNavigationProp<AppTabParamList>
>

type AboutScreenRouteProp = RouteProp<SettingsStackParamList, 'About'>

export type AboutScreenNavigationProps = {
  navigation: AboutScreenNavigationProp;
  route: AboutScreenRouteProp;
};

// HabitArchive
type HabitArchiveNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingsStackParamList, 'HabitArchive'>,
  BottomTabNavigationProp<AppTabParamList>
>

type HabitArchiveRouteProp = RouteProp<SettingsStackParamList, 'HabitArchive'>

export type HabitArchiveNavigationProps = {
  navigation: HabitArchiveNavigationProp;
  route: HabitArchiveRouteProp;
};


////////////////////////////////////////////////////////////////////////////////////////////////////






/////////////////////////////////////////////

