import React, { useMemo } from 'react';
import { useColorScheme, StyleSheet, Text, View, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../styles/themes';
import { StatisticsStackParamList, StatisticsScreenNavigationProps, StatisticsDetailsScreenNavigationProps, HabitState } from '../types/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StatisticsListItem from '../components/StatisticsListItem';


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


const StatisticsScreen = ({ navigation }: StatisticsScreenNavigationProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const renderItem = ({ item }: { item: Habit }) => {
    return (
      <View style={dynamicStyles.itemContainer}>
        <StatisticsListItem
          habitName={item.habitName}
          onPress={() => navigation.navigate('StatisticsDetails' as any)}
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

const StatisticsDetailsScreen = ({ navigation }: StatisticsDetailsScreenNavigationProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  return (
    <View style={dynamicStyles.container}>
    </View>
  );
};


const StatisticsStack = createStackNavigator<StatisticsStackParamList>();

const StatisticsStackScreen = () => {
  return (
    <StatisticsStack.Navigator
      screenOptions={({ route }) => ({
        headerTitle: t('statisticsScreenTitle'),
      })}
    >
      <StatisticsStack.Screen name="Statistics" component={StatisticsScreen} />
      <StatisticsStack.Screen name="StatisticsDetails" component={StatisticsDetailsScreen} />
    </StatisticsStack.Navigator>
  );
}


const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: theme.colorBackground,
  },
  text: {
    color: theme.colorOnBackground,
  },
  itemContainer: {
    marginVertical: 1,
  },
});

export default StatisticsStackScreen;
