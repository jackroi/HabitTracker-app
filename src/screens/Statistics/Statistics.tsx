import React, { useMemo } from 'react';
import { useColorScheme, StyleSheet, Text, View, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../../styles/themes';
import { StatisticsStackParamList, StatisticsScreenNavigationProps, StatisticsDetailsScreenNavigationProps } from '../../types/types';
import StatisticsListItem from '../../components/StatisticsListItem';
import StatisticsDetailsScreen from './StatisticsDetails';
import { HabitState } from '../../api/models/Habit';


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
      <View>
        <StatisticsListItem
          habitName={item.habitName}
          onPress={() => {
            navigation.navigate('StatisticsDetails' as any, {
              habitId: item.id,
            } as never);
          }}
        />
      </View>
    );
  };

  return (
    <View style={dynamicStyles.container}>
      <FlatList
        data={FAKE_DATA}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={dynamicStyles.itemSeparatorView} />
        )}
        ListHeaderComponent={() => (
          <View style={dynamicStyles.itemSeparatorView} />
        )}
        ListFooterComponent={() => (
          <View style={dynamicStyles.itemSeparatorView} />
        )}
      />
    </View>
  );
};




const StatisticsStack = createStackNavigator<StatisticsStackParamList>();

const StatisticsStackScreen = () => {
  return (
    <StatisticsStack.Navigator
      initialRouteName={'Statistics'}
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
  itemSeparatorView: {
    height: 1,
    width: '100%',
    backgroundColor: theme.colorListItemSeparator,
  },
});

export default StatisticsStackScreen;
