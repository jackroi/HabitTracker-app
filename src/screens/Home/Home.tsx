import React, { useMemo } from 'react';
import { Button, StyleSheet, Text, View, FlatList, StatusBar, useColorScheme, TouchableOpacity, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../../styles/themes';
import { HomeStackParamList, HomeScreenNavigationProps, HabitState } from '../../types/types';
import HabitButton from '../../components/HabitButton';
import AddHabitScreen from './AddHabit'



interface Habit {
  id: string;
  habitName: string;
  habitState: HabitState;
}


const FAKE_DATA_1: Habit[] = [
  {
    id: "0",
    habitName: "Run",
    habitState: HabitState.NOT_COMPLETED,
  },
  {
    id: "1",
    habitName: "Study",
    habitState: HabitState.NOT_COMPLETED,
  },
  {
    id: "2",
    habitName: "Watch",
    habitState: HabitState.NOT_COMPLETED,
  },
  {
    id: "3",
    habitName: "Jump",
    habitState: HabitState.NOT_COMPLETED,
  },
];

const FAKE_DATA_2: Habit[] = [
  {
    id: "4",
    habitName: "Hide",
    habitState: HabitState.NOT_COMPLETED,
  },
  {
    id: "5",
    habitName: "Search",
    habitState: HabitState.NOT_COMPLETED,
  },
  {
    id: "6",
    habitName: "Drive",
    habitState: HabitState.NOT_COMPLETED,
  },
  {
    id: "7",
    habitName: "Go",
    habitState: HabitState.NOT_COMPLETED,
  },
];

const DATA = [
  {
    title: 'Productivity',
    data: FAKE_DATA_1,
  },
  {
    title: 'Sport',
    data: FAKE_DATA_2,
  },
];


const HomeScreen = ({ navigation }: HomeScreenNavigationProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const renderItem = ({ item }: { item: Habit }) => {
    return (
      <View style={dynamicStyles.item}>
        <HabitButton
          habitName={item.habitName}
          habitState={item.habitState}
        />
      </View>
    );
  };

  const renderSectionHeader = ({ section: { title }}: { section: { title: string } }) => {
    return (
      <Text style={dynamicStyles.sectionHeader}>{title}</Text>
    );
  };

  return (
    <View style={dynamicStyles.container}>
      <SectionList
        sections={DATA}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};


const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackScreen = () => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const navigation = useNavigation();

  return (
    <HomeStack.Navigator
      initialRouteName={'Home'}
      screenOptions={({ route }) => ({
        headerTitle: t('homeScreenTitle'),
      })}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddHabit')}
              style={dynamicStyles.addButton}
            >
              <MaterialIcons name={'add'} size={30} color={theme.colorOnBackground} />
            </TouchableOpacity>
          )
        }}
      />
      <HomeStack.Screen name={'AddHabit'} component={AddHabitScreen} />
    </HomeStack.Navigator>
  );
}


const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorBackground,
  },
  sectionHeader: {
    backgroundColor: theme.colorBackground,
    color: theme.colorOnBackground,
    fontSize: 20,
    paddingVertical: 10,
    marginLeft: 20,
    fontWeight: 'bold'
  },
  item: {
    marginVertical: 8,
    paddingHorizontal: 20,
  },
  addButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});

export default HomeStackScreen;
