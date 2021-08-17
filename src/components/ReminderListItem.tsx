import React, { useState, useMemo } from 'react';
import { useColorScheme, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Theme, getTheme } from '../styles/themes';
import { HabitType } from '../api/models/Habit';
import { t } from 'i18n-js';
import { DailyReminderInfo, LocationReminderInfo, MonthlyReminderInfo, ReminderType, ReminderInfo, WeeklyReminderInfo } from '../types/Reminder';





type DailyReminderProps = DailyReminderInfo['time'] & { habitName: string };

const DailyReminder = ({ habitName, hours, minutes }: DailyReminderProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  return (
    <View style={dynamicStyles.reminderView}>
      {/* Reminder info */}
      <Text style={dynamicStyles.text}>
        {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
      </Text>

      {/* Habit name */}
      <Text style={dynamicStyles.text}>{habitName}</Text>
    </View>
  );
};


type WeeklyReminderProps = WeeklyReminderInfo['time'] & { habitName: string };

const WeeklyReminder = ({ habitName, dayOfWeek, hours, minutes }: WeeklyReminderProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  return (
    <View style={dynamicStyles.reminderView}>
      {/* Reminder info */}
      <Text style={dynamicStyles.text}>
        {t(dayOfWeek)}, {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
      </Text>

      {/* Habit name */}
      <Text style={dynamicStyles.text}>{habitName}</Text>
    </View>
  );
};


type MonthlyReminderProps = MonthlyReminderInfo['time'] & { habitName: string };

const MonthlyReminder = ({ habitName, monthTime }: MonthlyReminderProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  return (
    <View style={dynamicStyles.reminderView}>
      {/* Reminder info */}
      <Text style={dynamicStyles.text}>
        {t(monthTime)}
      </Text>

      {/* Habit name */}
      <Text style={dynamicStyles.text}>{habitName}</Text>
    </View>
  );
};


type LocationReminderProps = LocationReminderInfo['location'] & { habitName: string };

const LocationReminder = ({ habitName, name }: LocationReminderProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  return (
    <View style={dynamicStyles.reminderView}>
      {/* Reminder info */}
      <Text style={dynamicStyles.text}>
        {name}
      </Text>

      {/* Habit name */}
      <Text style={dynamicStyles.text}>{habitName}</Text>
    </View>
  );
};


type ReminderListItemProps = {
  reminderId: number;
  habitName: string;
  reminderInfo: ReminderInfo;
  onPress: (reminderId: number) => void;
}


const ReminderListItem = ({ reminderId, habitName, reminderInfo, onPress }: ReminderListItemProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  let reminderView;
  switch (reminderInfo.type) {
    case ReminderType.DAILY:
      reminderView = (
        <DailyReminder
          habitName={habitName}
          hours={reminderInfo.time.hours}
          minutes={reminderInfo.time.minutes}
        />
      );
      break;

    case ReminderType.WEEKLY:
      reminderView = (
        <WeeklyReminder
          habitName={habitName}
          dayOfWeek={reminderInfo.time.dayOfWeek}
          hours={reminderInfo.time.hours}
          minutes={reminderInfo.time.minutes}
        />
      );
      break;

    case ReminderType.MONTHLY:
      reminderView = (
        <MonthlyReminder
          habitName={habitName}
          monthTime={reminderInfo.time.monthTime}
        />
      );
      break;

    case ReminderType.LOCATION:
      reminderView = (
        <LocationReminder
          habitName={habitName}
          name={reminderInfo.location.name}
        />
      );
      break;

    default:
      const _exhaustiveCheck: never = reminderInfo;
      return _exhaustiveCheck;
  }

  return (
    <TouchableOpacity
      style={dynamicStyles.container}
      onPress={() => onPress(reminderId)}
      activeOpacity={0.5}
    >
      { reminderView }
    </TouchableOpacity>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.colorBackground,
  },
  reminderView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: theme.colorBackground,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 30,
    backgroundColor: theme.colorListItem,
  },
  text: {
    fontSize: 18,
    color: theme.colorOnBackground,
  },
});

export default ReminderListItem;
