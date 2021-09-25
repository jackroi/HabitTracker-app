import React, { useMemo, useReducer, useEffect } from 'react';
import { useColorScheme, StyleSheet, Text, View, FlatList } from 'react-native';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../../styles/themes';
import { StatisticsDetailsScreenNavigationProps } from '../../types/types';
import { GetHabitHistoryResponseBody, GetHabitResponseBody, GetHabitStatsResponseBody } from '../../api/httpTypes/responses';
import { HabitTrackerApi } from '../../api/HabitTrackerApi';
import { DateTime, DurationInput, DurationObjectUnits } from 'luxon';
import { ClientHabit, HabitState, HabitType } from '../../api/models/Habit';
import { ClientHistoryEntry, HistoryEntry, HistoryEntryType } from '../../api/models/HistoryEntry';
import Box from '../../components/Box';
import getSocket from '../../utils/initialize-socket-io';
import { Ok } from '../../utils/Result';
import Toast from 'react-native-root-toast';


// Monthly status
// Yearly status

type YearlyStatusProps = {
  history: ClientHistoryEntry[];
  habitType: HabitType;
}

type ItemProps = {
  state: HabitState;
}

const getItemColor = (state: HabitState): string => {
  const theme = getTheme(useColorScheme());

  let backgroundColor: string;
  switch (state) {
    case HabitState.NOT_COMPLETED:
      backgroundColor = theme.colorNotCompletedHabitCell;
      break;
    case HabitState.SKIPPED:
      backgroundColor = theme.colorSkippedHabitCell;
      break;
    case HabitState.COMPLETED:
      backgroundColor = theme.colorCompletedHabitCell;
      break;
    default:
      const _exhaustiveCheck: never = state;
      return _exhaustiveCheck;
  }
  return backgroundColor;
};

const DailyItem = ({ state }: ItemProps) => {
  const backgroundColor = getItemColor(state);
  return (
    <View
      style={{
        width: '1.3%',
        height: 5,
        // aspectRatio: 1,
        marginVertical: 1,
        marginHorizontal: '0.275%',
        backgroundColor: backgroundColor,
      }}
    >
    </View>
  );
};

const WeeklyItem = ({ state }: ItemProps) => {
  const backgroundColor = getItemColor(state);
  return (
    <View
      style={{
        width: '1.3%',
        height: '90%',
        // aspectRatio: 1,
        marginVertical: 1,
        marginHorizontal: '0.275%',
        backgroundColor: backgroundColor,
      }}
    >
    </View>
  );
};

const MonthlyItem = ({ state }: ItemProps) => {
  const backgroundColor = getItemColor(state);
  return (
    <View
      style={{
        width: '7.15%',
        height: '90%',
        // aspectRatio: 1,
        marginVertical: 1,
        marginHorizontal: '0.275%',
        backgroundColor: backgroundColor,
      }}
    >
    </View>
  );
};

const getDateStates = (history: ClientHistoryEntry[], habitType: HabitType): HabitState[] => {
  const todayDate = DateTime.now().startOf('day');
  const aYearAgoDate = todayDate.minus({ years: 1 }).startOf(
    (habitType === HabitType.DAILY || habitType === HabitType.WEEKLY) ? 'week' : 'month'
  );

  let unit: keyof DurationObjectUnits;
  let periodDuration: DurationInput;
  switch (habitType) {
    case HabitType.DAILY:
      unit = 'day';
      periodDuration = { days: 1 };
      break;
    case HabitType.WEEKLY:
      unit = 'week';
      periodDuration = { weeks: 1 };
      break;
    case HabitType.MONTHLY:
      unit = 'month';
      periodDuration = { months: 1 };
      break;
    default:
      const _exhaustiveCheck: never = habitType;
      return _exhaustiveCheck;
  }

  const dateStates: HabitState[] = [];
  let date = aYearAgoDate;
  while (date <= todayDate) {
    const historyEntry = history.find((historyEntry) => historyEntry.date.hasSame(date, unit));

    let state: HabitState;
    switch (historyEntry?.type) {
      case undefined:
        state = HabitState.NOT_COMPLETED;
        break;
      case HistoryEntryType.COMPLETED:
        state = HabitState.COMPLETED;
        break;
      case HistoryEntryType.SKIPPED:
        state = HabitState.SKIPPED;
        break;
    }

    dateStates.push(state);

    date = date.plus(periodDuration);
  }

  return dateStates;
};


const YearlyStatus = ({ history, habitType }: YearlyStatusProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const dateStates = getDateStates(history, habitType);

  return (
    <View
      style={dynamicStyles.yearlyStatusContainer}
    >
      {
        dateStates.map((dateState, index) => {
          switch (habitType) {
            case HabitType.DAILY:
              return <DailyItem state={dateState} key={index} />

            case HabitType.WEEKLY:
              return <WeeklyItem state={dateState} key={index} />

            case HabitType.MONTHLY:
              return <MonthlyItem state={dateState} key={index} />

            default:
              const _exhaustiveCheck: never = habitType;
              return _exhaustiveCheck;
          }
        })
      }
    </View>
  );







//   const views: JSX.Element[] = [];
//   for (let row = 0; row < 7; row++) {
//     for (let col = 0; col < 50; col++) {
//       views.push(<View key={'' + row + ',' + col} style={{ height: 20, width: 20, backgroundColor: 'red', margin: 1 }}></View>)
//     }
//   }

//   return (
//     <View style={{ width: '100%', backgroundColor: 'gray', flexWrap: 'wrap' }}>
//       {
// views
//       }
//     </View>
//   );

};









interface State {
  stats: GetHabitStatsResponseBody['stats'] | null;
  habit: ClientHabit | null;
  history: ClientHistoryEntry[],
  isLoading: boolean;
  errorMessage: string;
}

type Action =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS', habit: ClientHabit, stats: GetHabitStatsResponseBody['stats'], history: ClientHistoryEntry[] }
  | { type: 'FETCH_FAILURE', errorMessage: string };




const StatisticsDetailsScreen = ({ navigation, route }: StatisticsDetailsScreenNavigationProps) => {
  const habitTrackerApi = HabitTrackerApi.getInstance();

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const { habitId } = route.params;

  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case 'FETCH_INIT':
          return {
            ...state,
            habit: null,
            stats: null,
            history: [],
            isLoading: true,
            errorMessage: '',
          };

        case 'FETCH_SUCCESS':
          return {
            ...state,
            habit: action.habit,
            stats: action.stats,
            history: action.history,
            isLoading: false,
            errorMessage: '',
          };

        case 'FETCH_FAILURE':
          return {
            ...state,
            habit: null,
            stats: null,
            history: [],
            isLoading: false,
            errorMessage: action.errorMessage,
          };
      }
    },
    {
      habit: null,
      stats: null,
      history: [],
      isLoading: false,
      errorMessage: '',
    }
  );

  const fetchStats = async () => {
    dispatch({ type: 'FETCH_INIT' });

    const results = await Promise.all([
      habitTrackerApi.getHabit(habitId),
      habitTrackerApi.getHabitStats(habitId),
      habitTrackerApi.getHabitHistory(habitId),
    ]);

    for (let result of results) {
      if (!result.success) {
        dispatch({ type: 'FETCH_FAILURE', errorMessage: result.error });
        Toast.show(t('statisticsLoadingFailed'), {
          duration: Toast.durations.LONG,
          position: -100,
          backgroundColor: theme.colorToastBackground,
          textColor: theme.colorToastText,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        return;
      }
    }

    const habitResult = results[0] as Ok<GetHabitResponseBody['habit'], never>;
    const habit = { ...habitResult.value, creationDate: DateTime.fromISO(habitResult.value.creationDate) };

    const statsResult = results[1] as Ok<GetHabitStatsResponseBody['stats'], never>;
    const stats = statsResult.value;

    const historyResult = results[2] as Ok<GetHabitHistoryResponseBody['history'], never>;
    const history = historyResult.value.map((historyEntry) => ({ ...historyEntry, date: DateTime.fromISO(historyEntry.date) }));

    dispatch({ type: 'FETCH_SUCCESS', habit: habit, stats: stats, history: history });
  };

  useEffect(() => {
    fetchStats();
  }, [habitId]);


  useEffect(() => {
    const socket = getSocket();

    const listener = (interestedHabitId: string) => {
      if (interestedHabitId === habitId) {
        fetchStats();
      }
    };

    socket.on('habitCreated', listener);
    socket.on('habitUpdated', listener);
    socket.on('habitHistoryUpdated', listener);
    socket.on('habitDeleted', listener);

    return () => {
      socket.off('habitCreated', listener);
      socket.off('habitUpdated', listener);
      socket.off('habitHistoryUpdated', listener);
      socket.off('habitDeleted', listener);
    };
  }, [habitId]);

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.headerText}>{state.habit?.name}</Text>
      <View style={dynamicStyles.boxesContainer}>
        <Box title={t('currentStreakStats')} value={state.stats && state.stats.currentStreak.toString()} />
        <Box title={t('bestStreakStats')} value={state.stats && state.stats.bestStreak.toString()} />
        <Box title={t('completedStats')} value={state.stats && state.stats.completedCount.toString()} />
        <Box title={t('percentageStats')} value={state.stats && state.stats.completedPercentage.toFixed(2)} />
      </View>
      <View style={dynamicStyles.creationDateView}>
        <Text style={dynamicStyles.creationDateText}>{t('creationDate')}: {state.habit?.creationDate.toISODate()}</Text>
      </View>
      <YearlyStatus
        habitType={state.habit?.type || HabitType.DAILY}
        history={state.history}
      />
    </View>
  );
};


const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: theme.colorBackground,
  },
  headerText: {
    color: theme.colorOnBackground,
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
    padding: 10,
  },
  boxesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  text: {
    color: theme.colorOnBackground,
  },
  creationDateView: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    backgroundColor: theme.colorSurface,
  },
  creationDateText: {
    color: theme.colorOnSurface,
    fontSize: 20,
    alignSelf: 'center',
    padding: 10,
  },
  yearlyStatusContainer: {
    marginTop: 10,
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
    height: (5+2)*7+2,
    // aspectRatio: 55/8,
    borderWidth: 1,
    borderColor: theme.colorSurface,
  },
});


export default StatisticsDetailsScreen;
