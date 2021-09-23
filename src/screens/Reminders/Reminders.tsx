import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { useColorScheme, StyleSheet, Text, View, FlatList, SectionList, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../../styles/themes';
import { RemindersStackParamList, RemindersScreenNavigationProps } from '../../types/types';
import { ReminderType, ReminderInfo, DailyReminderInfo, WeeklyReminderInfo, MonthlyReminderInfo, LocationReminderInfo } from '../../types/Reminder';
import ReminderListItem from '../../components/ReminderListItem';
import { DbReminder } from '../../db/reminders-db';
import { ClientHabit } from '../../api/models/Habit';
import { HabitTrackerApi } from '../../api/HabitTrackerApi';
import * as RemindersDb from '../../db/reminders-db';
import { Ok } from '../../utils/Result';
import { GetHabitsResponseBody } from '../../api/httpTypes/responses';
import { DateTime } from 'luxon';
import Toast from 'react-native-root-toast';


type ReminderItemData = {
  habit: ClientHabit;
  reminderId: number;
  notificationId: string;
  reminderInfo: ReminderInfo;
}


const getSectionName = (reminderType: ReminderType): string => {
  switch (reminderType) {
    case ReminderType.DAILY: return t('dailyReminders');
    case ReminderType.WEEKLY: return t('weeklyReminders');
    case ReminderType.MONTHLY: return t('monthlyReminders');
    case ReminderType.LOCATION: return t('locationReminders');
    default:
      const _exhaustiveCheck: never = reminderType;
      return _exhaustiveCheck;
  }
};


const getReminderTypeRanking = (reminderType: ReminderType): number => {
  switch (reminderType) {
    case ReminderType.DAILY: return 0;
    case ReminderType.WEEKLY: return 1;
    case ReminderType.MONTHLY: return 2;
    case ReminderType.LOCATION: return 3;
    default:
      const _exhaustiveCheck: never = reminderType;
      return _exhaustiveCheck;
  }
};

const getWeekdayRanking = (weekday: WeeklyReminderInfo['time']['dayOfWeek']): number => {
  switch (weekday) {
    case 'monday': return 0;
    case 'tuesday': return 1;
    case 'wednesday': return 2;
    case 'thursday': return 3;
    case 'friday': return 4;
    case 'saturday': return 5;
    case 'sunday': return 6;
    default:
      const _exhaustiveCheck: never = weekday;
      return _exhaustiveCheck;
  }
};

const getMonthTimeRanking = (monthTime: MonthlyReminderInfo['time']['monthTime']): number => {
  switch (monthTime) {
    case 'monthStart': return 0;
    case 'monthHalf': return 1;
    case 'monthEnd': return 2;
    default:
      const _exhaustiveCheck: never = monthTime;
      return _exhaustiveCheck;
  }
};

const sortSectionElements = (sectionElements: ReminderItemData[]) => {
  const compareReminder = (a: ReminderItemData, b: ReminderItemData): number => {
    let bReminderInfo;
    switch (a.reminderInfo.type) {
      case ReminderType.DAILY:
        bReminderInfo = b.reminderInfo as DailyReminderInfo;
        return a.reminderInfo.time.hours - bReminderInfo.time.hours
          || a.reminderInfo.time.minutes - bReminderInfo.time.minutes;
      case ReminderType.WEEKLY:
        bReminderInfo = b.reminderInfo as WeeklyReminderInfo;
        return getWeekdayRanking(a.reminderInfo.time.dayOfWeek) - getWeekdayRanking(bReminderInfo.time.dayOfWeek)
          || a.reminderInfo.time.hours - bReminderInfo.time.hours
          || a.reminderInfo.time.minutes - bReminderInfo.time.minutes;

      case ReminderType.MONTHLY:
        bReminderInfo = b.reminderInfo as MonthlyReminderInfo;
        return getMonthTimeRanking(a.reminderInfo.time.monthTime) - getMonthTimeRanking(bReminderInfo.time.monthTime);

      case ReminderType.LOCATION:
        bReminderInfo = b.reminderInfo as LocationReminderInfo;
        return a.reminderInfo.location.name.localeCompare(bReminderInfo.location.name);
    }
  };

  return sectionElements.sort(compareReminder);
};


const divideRemindersBySection = (reminders: ReminderItemData[]) => {
  const sectionMap = new Map<string,ReminderItemData[]>();

  for (let reminder of reminders) {
    if (!sectionMap.has(reminder.reminderInfo.type)) {
      sectionMap.set(reminder.reminderInfo.type, []);
    }
    sectionMap.get(reminder.reminderInfo.type)?.push({
      habit: reminder.habit,
      reminderId: reminder.reminderId,
      notificationId: reminder.notificationId,
      reminderInfo: reminder.reminderInfo,
    });
  }

  const output = [];
  for (let key of sectionMap.keys()) {
    const key_ = key as ReminderType;
    output.push({
      type: key_,
      title: getSectionName(key_),
      data: sortSectionElements(sectionMap.get(key) as ReminderItemData[]),
    });
    output.sort((a, b) => getReminderTypeRanking(a.type) - getReminderTypeRanking(b.type));
  }

  return output;
};

const getHabitFromId = (habits: ClientHabit[], habitId: string): ClientHabit | null => {
  const habit = habits.find((item) => item.id === habitId);
  return habit || null;
};


interface State {
  reminders: ReminderItemData[];
  isLoading: boolean;
  // errorMessage: string;
}

type Action =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS', reminders: ReminderItemData[] }
  | { type: 'FETCH_FAILURE' /* , errorMessage: string */ };


const RemindersScreen = ({ navigation }: RemindersScreenNavigationProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const habitTrackerApi = HabitTrackerApi.getInstance();

  const [eliminatedCount, setEliminatedCount] = useState(0);

  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case 'FETCH_INIT':
          // TODO aggiungere uno spinner per la fase di loading
          return {
            ...state,
            // habits: [],     // TODO valutare
            isLoading: true,
            // errorMessage: '',
          };

        case 'FETCH_SUCCESS':
          return {
            ...state,
            reminders: action.reminders,
            isLoading: false,
            // errorMessage: '',
          };

        case 'FETCH_FAILURE':
          return {
            ...state,
            reminders: [],    // TODO valutare se lasciare la lista precedente all'errore
            isLoading: false,
            // errorMessage: action.errorMessage,
          };
      }
    },
    {
      reminders: [],
      isLoading: false,
      // errorMessage: '',
    }
  );

  const showDeleteReminderDialog = (reminderId: number, notificationId: string) => {
    return (
      Alert.alert(
        t('deleteReminder'),
        t('deleteReminderAlertMessage'),
        [
          {
            text: t('cancel'),
            style: 'cancel',
          },
          {
            text: t('delete'),
            style: 'destructive',
            onPress: async () => {
              // Cancel notification schedule
              Notifications.cancelScheduledNotificationAsync(notificationId);

              const db = RemindersDb.openDatabase();
              await RemindersDb.deleteReminder(db, reminderId);

              setEliminatedCount(eliminatedCount + 1);
            },
          }
        ],
        {
          cancelable: true,
        }
      )
    );
  };


  const fetchHabitsAndReminders = async () => {
    dispatch({ type: 'FETCH_INIT' });

    const db = RemindersDb.openDatabase();
    const results = await Promise.all([
      habitTrackerApi.getHabits(),
      RemindersDb.getReminders(db),
    ]);

    for (let result of results) {
      if (!result.success) {
        dispatch({ type: 'FETCH_FAILURE' /* , errorMessage: result.error */ });
        Toast.show(result.error, {
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

    const habitsResult = results[0] as Ok<GetHabitsResponseBody['habits'], never>;
    const habits = habitsResult.value.map((habit) => ({ ...habit, creationDate: DateTime.fromISO(habit.creationDate) }));

    const remindersResult = results[1] as Ok<DbReminder[], never>;
    const reminders: ReminderItemData[] = remindersResult.value
      .filter((reminder) => {
        return getHabitFromId(habits, reminder.habitId) !== null;
      })
      .map((reminder) => ({
        habit: getHabitFromId(habits, reminder.habitId) as ClientHabit,
        reminderId: reminder.id,
        notificationId: reminder.notificationId,
        reminderInfo: reminder.reminderInfo,
      }));

    dispatch({ type: 'FETCH_SUCCESS', reminders: reminders })
  };

  useEffect(() => {
    fetchHabitsAndReminders();
  }, [eliminatedCount]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchHabitsAndReminders();
    });

    return unsubscribe;
  }, [navigation]);

  const renderSectionHeader = ({ section: { title }}: { section: { title: string } }) => {
    return (
      <View style={dynamicStyles.sectionHeader}>
        <Text style={dynamicStyles.sectionHeaderText}>{title}</Text>
      </View>
    );
  };

  const renderItem = ({ item }: { item: ReminderItemData }) => {
    return (
      <ReminderListItem
        reminderId={item.reminderId}
        habitName={item.habit.name}
        reminderInfo={item.reminderInfo}
        onPress={(reminderId) => showDeleteReminderDialog(reminderId, item.notificationId)}
      />
    );
  };

  return (
    <View style={dynamicStyles.container}>
      {
        state.reminders.length === 0 ?
        (
          <Text style={dynamicStyles.text}>{t('noRemindersSetted')}</Text>
        )
        :
        (
          <SectionList
            sections={divideRemindersBySection(state.reminders)}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            stickySectionHeadersEnabled={false}
            keyExtractor={(item) => item.reminderId.toString()}
          />
        )
      }
    </View>
  );
};


const RemindersStack = createStackNavigator<RemindersStackParamList>();

const RemindersStackScreen = () => {
  return (
    <RemindersStack.Navigator
      screenOptions={({ route }) => ({
        headerTitle: t('remindersScreenTitle'),
      })}
    >
      <RemindersStack.Screen name="Reminders" component={RemindersScreen} />
    </RemindersStack.Navigator>
  );
};


const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colorOnBackground,
  },
  sectionHeader: {
    backgroundColor: theme.colorBackground,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  sectionHeaderText: {
    fontSize: 20,
    color: theme.colorOnBackground,
    fontWeight: 'bold',
  },
});


export default RemindersStackScreen;
