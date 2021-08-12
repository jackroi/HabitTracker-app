import React, { useMemo, useReducer, useEffect } from 'react';
import { useColorScheme, StyleSheet, Text, View, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../../styles/themes';
import { StatisticsStackParamList, StatisticsScreenNavigationProps, StatisticsDetailsScreenNavigationProps } from '../../types/types';
import HabitListItem from '../../components/HabitListItem';
import StatisticsDetailsScreen from './StatisticsDetails';
import { ClientHabit, HabitState } from '../../api/models/Habit';
import { HabitTrackerApi, Ok } from '../../api/HabitTrackerApi';
import { GetGeneralStatsResponseBody, GetHabitsResponseBody, GetHabitStatsResponseBody } from '../../api/httpTypes/responses';
import { DateTime } from 'luxon';
import Box from '../../components/Box';
import getSocket from '../../utils/initialize-socket-io';


interface State {
  habits: ClientHabit[];
  stats: GetGeneralStatsResponseBody['stats'] | null;
  isLoading: boolean;
  errorMessage: string;
}

type Action =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS', habits: ClientHabit[], stats: GetGeneralStatsResponseBody['stats'] }
  | { type: 'FETCH_FAILURE', errorMessage: string };



const StatisticsScreen = ({ navigation }: StatisticsScreenNavigationProps) => {
  const habitTrackerApi = HabitTrackerApi.getInstance();

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case 'FETCH_INIT':
          // TODO aggiungere uno spinner per la fase di loading
          return {
            ...state,
            // habits: [],     // TODO valutare
            isLoading: true,
            errorMessage: '',
          };

        case 'FETCH_SUCCESS':
          return {
            ...state,
            habits: action.habits,
            stats: action.stats,
            isLoading: false,
            errorMessage: '',
          };

        case 'FETCH_FAILURE':
          return {
            ...state,
            habits: [],     // TODO valutare se lasciare la lista precedente all'errore
            stats: null,
            isLoading: false,
            errorMessage: action.errorMessage,
          };
      }
    },
    {
      habits: [],
      stats: null,
      isLoading: false,
      errorMessage: '',
    }
  );

  const fetchHabitsAndStats = async () => {
    dispatch({ type: 'FETCH_INIT' });

    const results = await Promise.all([
      habitTrackerApi.getHabits(),
      habitTrackerApi.getGeneralStats(),
    ]);

    for (let result of results) {
      if (!result.success) {
        dispatch({ type: 'FETCH_FAILURE', errorMessage: result.error });
        return;
      }
    }

    const habitsResult = results[0] as Ok<GetHabitsResponseBody['habits'], never>;
    const habits = habitsResult.value.map((habit) => ({ ...habit, creationDate: DateTime.fromISO(habit.creationDate) }));

    const statsResult = results[1] as Ok<GetGeneralStatsResponseBody['stats'], never>;
    const stats = statsResult.value;

    dispatch({ type: 'FETCH_SUCCESS', habits: habits, stats: stats });
  };

  useEffect(() => {
    fetchHabitsAndStats();
  }, []);   // TODO cosa mettere tra [] ???

  useEffect(() => {
    const socket = getSocket();
    socket.on('habitCreated', () => {
      console.info('received event:','habitCreated')
      fetchHabitsAndStats();
    });
    socket.on('habitUpdated', () => {
      console.info('received event:','habitUpdated')
      fetchHabitsAndStats();
    });
    socket.on('habitHistoryUpdated', () => {
      console.info('received event:','habitHistoryUpdated')
      fetchHabitsAndStats();
    });
    socket.on('habitDeleted', () => {
      console.info('received event:','habitDeleted')
      fetchHabitsAndStats();
    });
  }, []);

  const renderItem = ({ item }: { item: ClientHabit }) => {
    return (
      <View>
        <HabitListItem
          habitId={item.id}
          habitName={item.name}
          withArrow={true}
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

      {/* General habits statistics */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 10 }}>
        <Box title={'Active habits'} value={state.stats && state.stats.activeHabitCount.toString()} />
        <Box title={'Archived habits'} value={state.stats && state.stats.archivedHabitCount.toString()} />
        <Box title={'Completed'} value={state.stats && state.stats.completedCount.toString()} />
        <Box title={'Percentage'} value={state.stats && state.stats.completedPercentage.toFixed(2)} />
      </View>

      {/* Active habit list */}
      <FlatList
        data={state.habits}
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
        keyExtractor={(item) => item.id}
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
