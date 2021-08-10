import React, { useMemo, useReducer, useEffect } from 'react';
import { useColorScheme, StyleSheet, Text, View, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../../styles/themes';
import { StatisticsStackParamList, StatisticsScreenNavigationProps, StatisticsDetailsScreenNavigationProps } from '../../types/types';
import HabitListItem from '../../components/HabitListItem';
import StatisticsDetailsScreen from './StatisticsDetails';
import { ClientHabit, HabitState } from '../../api/models/Habit';
import { HabitTrackerApi } from '../../api/HabitTrackerApi';
import { GetHabitsResponseBody } from '../../api/httpTypes/responses';
import { DateTime } from 'luxon';


interface State {
  habits: ClientHabit[];
  isLoading: boolean;
  errorMessage: string;
}

type Action =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS', habits: ClientHabit[] }
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
            isLoading: false,
            errorMessage: '',
          };

        case 'FETCH_FAILURE':
          return {
            ...state,
            habits: [],     // TODO valutare se lasciare la lista precedente all'errore
            isLoading: false,
            errorMessage: action.errorMessage,
          };
      }
    },
    {
      habits: [],
      isLoading: false,
      errorMessage: '',
    }
  );

  useEffect(() => {
    const fetchHabits = async () => {
      dispatch({ type: 'FETCH_INIT' });

      const result = await habitTrackerApi.getHabits();
      if (result.success) {
        // TODO sort alphabetically
        const habits = result.value.map((habit) => ({ ...habit, creationDate: DateTime.fromISO(habit.creationDate) }));
        dispatch({ type: 'FETCH_SUCCESS', habits: habits });
      }
      else {
        dispatch({ type: 'FETCH_FAILURE', errorMessage: result.error });
      }
    }

    fetchHabits();
  }, []);   // TODO cosa mettere tra [] ???

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
