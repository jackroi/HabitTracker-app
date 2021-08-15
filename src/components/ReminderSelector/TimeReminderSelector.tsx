import React, { useState, useMemo, useEffect } from 'react';
import { useColorScheme, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Theme, getTheme } from '../../styles/themes';
import { HabitType } from '../../api/models/Habit';
import { t } from 'i18n-js';
import { DailyReminderInfo, LocationReminderInfo, MonthlyReminderInfo, ReminderType, ReminderInfo, WeeklyReminderInfo } from '../../types/Reminder';
import DailyTimeReminderSelector from './DailyTimeReminderSelector';
import WeeklyTimeReminderSelector from './WeeklyTimeReminderSelector';
import MonthlyTimeReminderSelector from './MonthlyTimeReminderSelector';



type TimeReminderSelectorProps = {
  onConfirm: (reminderInfo: ReminderInfo) => void;
}



const TimeReminderSelector = ({ onConfirm }: TimeReminderSelectorProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  // TODO retrieve somewhere the habit type
  const habitType: HabitType = HabitType.MONTHLY as HabitType;

  switch (habitType) {
    case HabitType.DAILY:
      return (
        <DailyTimeReminderSelector
          onConfirm={onConfirm}
        />
      );

    case HabitType.WEEKLY:
      return (
        <WeeklyTimeReminderSelector
          onConfirm={onConfirm}
        />
      );

    case HabitType.MONTHLY:
      return (
        <MonthlyTimeReminderSelector
          onConfirm={onConfirm}
        />
      );

    default:
      const _exhaustiveCheck: never = habitType;
      return _exhaustiveCheck;
  }
};

const styles = (theme: Theme) => StyleSheet.create({

});

export default TimeReminderSelector;
