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
import { HabitTrackerApi } from '../../api/HabitTrackerApi';
import { useNavigation } from '@react-navigation/native';



type TimeReminderSelectorProps = {
  habitId: string;
  onConfirm: (reminderInfo: ReminderInfo) => void;
}



const TimeReminderSelector = ({ habitId, onConfirm }: TimeReminderSelectorProps) => {
  const habitTrackerApi = HabitTrackerApi.getInstance();

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const [habitType, setHabitType] = useState(null as HabitType | null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchHabitType = async () => {
      const result = await habitTrackerApi.getHabit(habitId);
      if (!result.success) {
        navigation.goBack();
        return;
      }

      setHabitType(result.value.type);
    };

    fetchHabitType();
  });

  if (!habitType) {
    return (
      <View style={dynamicStyles.activityIndicatorView}>
        <ActivityIndicator size={'large'} color={'gray'} />
      </View>
    );
  }

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
  activityIndicatorView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TimeReminderSelector;
