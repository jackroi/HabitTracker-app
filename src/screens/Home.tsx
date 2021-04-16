import React, { useMemo } from 'react';
import { Button, StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from 'i18n-js';
import { Theme, lightTheme, darkTheme } from '../styles/themes'

import { HomeScreenNavigationProps, HabitState } from '../types/types';
import HabitButton from '../components/HabitButton';



interface Habit {
  id: string;
  habitName: string;
  habitState: HabitState;
}

const FAKE_DATA: Habit[] = [
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


const HomeScreen = ({ navigation }: HomeScreenNavigationProps) => {
  const theme = {
    primary: 'ciao',
    secondary: 'pippo',
  }
  const dynamicStyles = useMemo(() => styles(theme), [theme])

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

  return (
    <View style={dynamicStyles.container}>
      <FlatList
        data={FAKE_DATA}
        renderItem={renderItem}
      />
    </View>
  );
};


// TODO aggiungere tipi e aggiungere stack anche nelle altre schermate
const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={({ route }) => ({
        headerTitle: t('loginScreenTitle'),
      })}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}


const styles = (theme: { primary: string, secondary: string }) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  item: {
    marginVertical: 8,
  },
});

export default HomeStackScreen;
