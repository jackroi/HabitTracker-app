import React, { useMemo } from 'react';
import { useColorScheme, StyleSheet, Text, View, FlatList, SectionList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../../styles/themes';
import { RemindersStackParamList, RemindersScreenNavigationProps } from '../../types/types';
import { ReminderType, ReminderInfo } from '../../types/Reminder';
import ReminderListItem from '../../components/ReminderListItem';



type ReminderItemData = {
  habitName: string;
  reminderInfo: ReminderInfo;
}


const FAKE_DAILY_REMINDERS: ReminderItemData[] = [
  {
    habitName: 'Test d',
    reminderInfo: {
      type: ReminderType.DAILY,
      time: {
        hours: 10,
        minutes: 5,
      },
    },
  },
  {
    habitName: 'Habit 2 d',
    reminderInfo: {
      type: ReminderType.DAILY,
      time: {
        hours: 13,
        minutes: 10,
      },
    },
  },
  {
    habitName: 'Learn d',
    reminderInfo: {
      type: ReminderType.DAILY,
      time: {
        hours: 20,
        minutes: 15,
      },
    },
  },
];

const FAKE_WEEKLY_REMINDERS: ReminderItemData[] = [
  {
    habitName: 'Test w',
    reminderInfo: {
      type: ReminderType.WEEKLY,
      time: {
        dayOfWeek: 'monday',
        hours: 10,
        minutes: 5,
      },
    },
  },
  {
    habitName: 'Habit 2 w',
    reminderInfo: {
      type: ReminderType.WEEKLY,
      time: {
        dayOfWeek: 'friday',
        hours: 13,
        minutes: 10,
      },
    },
  },
  {
    habitName: 'Learn w',
    reminderInfo: {
      type: ReminderType.WEEKLY,
      time: {
        dayOfWeek: 'sunday',
        hours: 20,
        minutes: 15,
      },
    },
  },
];

const FAKE_MONTHLY_REMINDERS: ReminderItemData[] = [
  {
    habitName: 'Test m',
    reminderInfo: {
      type: ReminderType.MONTHLY,
      time: {
        monthTime: 'monthStart',
      },
    },
  },
  {
    habitName: 'Habit 2 m',
    reminderInfo: {
      type: ReminderType.MONTHLY,
      time: {
        monthTime: 'monthHalf',
      },
    },
  },
  {
    habitName: 'Learn m',
    reminderInfo: {
      type: ReminderType.MONTHLY,
      time: {
        monthTime: 'monthEnd',
      },
    },
  },
];

const FAKE_LOCATION_REMINDERS: ReminderItemData[] = [
  {
    habitName: 'Test l',
    reminderInfo: {
      type: ReminderType.LOCATION,
      location: {
        name: 'Home'
      }
    },
  },
  {
    habitName: 'Habit 2 l',
    reminderInfo: {
      type: ReminderType.LOCATION,
      location: {
        name: 'Work'
      }
    },
  },
  {
    habitName: 'Learn l',
    reminderInfo: {
      type: ReminderType.LOCATION,
      location: {
        name: 'School'
      }
    },
  },
];

const FAKE_DATA = [
  {
    title: 'Daily reminders',
    data: FAKE_DAILY_REMINDERS,
  },
  {
    title: 'Weekly reminders',
    data: FAKE_WEEKLY_REMINDERS,
  },
  {
    title: 'Monthly reminders',
    data: FAKE_MONTHLY_REMINDERS,
  },
  {
    title: 'Location reminders',
    data: FAKE_LOCATION_REMINDERS,
  },
];


const RemindersScreen = ({ navigation }: RemindersScreenNavigationProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

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
        habitName={item.habitName}
        reminderInfo={item.reminderInfo}
        onPress={() => console.log('TODO')}
      />
    );
  };

  const keyExtractor = (item: ReminderItemData) => {
    let key = item.habitName;
    switch (item.reminderInfo.type) {
      case ReminderType.DAILY:
        key += (' ' + item.reminderInfo.time.hours + ' ' + item.reminderInfo.time.minutes);
        break;

      case ReminderType.WEEKLY:
        key += (' ' + item.reminderInfo.time.dayOfWeek + ' ' + item.reminderInfo.time.hours + ' ' + item.reminderInfo.time.minutes);
        break;

      case ReminderType.MONTHLY:
        key += (' ' + item.reminderInfo.time.monthTime);
        break;

      case ReminderType.LOCATION:
        key += (' ' + item.reminderInfo.location.name);
        break;

      default:
        const _exhaustiveCheck: never = item.reminderInfo;
        return _exhaustiveCheck;
    }

    return key;
  };

  return (
    <View style={dynamicStyles.container}>
      <SectionList
        sections={FAKE_DATA}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        keyExtractor={keyExtractor}
      />
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
