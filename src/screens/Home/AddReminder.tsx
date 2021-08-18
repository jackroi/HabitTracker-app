import React, { useEffect, useMemo, useState } from 'react';
import {
  useColorScheme,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../../styles/themes';
import { AddHabitScreenNavigationProps, AddReminderScreenNavigationProps } from '../../types/types';
import ModalPicker from '../../components/ModalPicker';
import { HabitTrackerApi } from '../../api/HabitTrackerApi';
import { HabitType } from '../../api/models/Habit';
import LocationReminderSelector from '../../components/ReminderSelector/LocationReminderSelector';
import { DailyReminderInfo, MonthlyReminderInfo, ReminderInfo, ReminderType, WeeklyReminderInfo } from '../../types/Reminder';
import DailyTimeReminderSelector from '../../components/ReminderSelector/DailyTimeReminderSelector';
import WeeklyTimeReminderSelector from '../../components/ReminderSelector/WeeklyTimeReminderSelector';
import TimeReminderSelector from '../../components/ReminderSelector/TimeReminderSelector';

import * as RemindersDb from '../../db/reminders-db';
import * as NotificationsHelper from '../../utils/NotificationsHelper';



const AddReminderScreen = ({ navigation, route }: AddReminderScreenNavigationProps) => {
  const [reminderType, setReminderType] = useState('time' as ('time' | 'location'));

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  useEffect(() => {
    NotificationsHelper.askNotificationPermission();

    // TODO probabilmente non serve
    // If we want to do something with the notification when the app
    // is active, we need to listen to notification events and
    // handle them in a callback
    // const listener = Notifications.addNotificationReceivedListener(handleNotification);
    // return () => listener.remove();
  }, []);

  const { habitId } = route.params;

  const onConfirmCallback = async (reminderInfo: ReminderInfo) => {
    const result = await HabitTrackerApi.getInstance().getHabit(habitId);
    if (!result.success) {
      // TODO eventuale toast di errore
      return;
    }

    const habitName = result.value.name;

    // Schedule the notification
    const notificationId = await NotificationsHelper.scheduleNotification(habitName, reminderInfo);

    // Save into db
    const db = RemindersDb.openDatabase();
    RemindersDb.addReminder(db, {
      habitId: habitId,
      notificationId: notificationId,
      reminderInfo: reminderInfo,
    });
    console.info('Reminder added to db');

    navigation.goBack();
  };

  return (
    <View style={dynamicStyles.container}>

      {/* Reminder "type" (time/location) switch */}
      <View style={dynamicStyles.reminderTypeSwitch}>

        {/* Time button */}
        <TouchableOpacity
          style={[
            dynamicStyles.reminderTypeButton,
            reminderType === 'time' ? dynamicStyles.selectedReminderTypeButton : null,
          ]}
          activeOpacity={0.5}
          onPress={() => setReminderType('time')}
        >
          <Text
            style={[
              dynamicStyles.reminderTypeButtonText,
              reminderType === 'time' ? dynamicStyles.SelectedReminderTypeButtonText : null,
            ]}
          >
            {t('timeReminder')}
          </Text>
        </TouchableOpacity>


        {/* Location button */}
        <TouchableOpacity
          style={[
            dynamicStyles.reminderTypeButton,
            reminderType === 'location' ? dynamicStyles.selectedReminderTypeButton : null,
          ]}
          activeOpacity={0.5}
          onPress={() => setReminderType('location')}
        >
          <Text
            style={[
              dynamicStyles.reminderTypeButtonText,
              reminderType === 'location' ? dynamicStyles.SelectedReminderTypeButtonText : null,
            ]}
          >
            {t('locationReminder')}
          </Text>
        </TouchableOpacity>

      </View>

      {/* Time/Location selection view */}
      { reminderType === 'time' ? (
        <TimeReminderSelector
          habitId={habitId}
          onConfirm={onConfirmCallback}
        />
      ) : (
        <LocationReminderSelector
          onConfirm={onConfirmCallback}
        />
      )}

    </View>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorBackground,
  },
  reminderTypeSwitch: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  reminderTypeButton: {
    width: '40%',
    borderRadius: 25,
    // borderWidth: 1,
    // borderColor: theme.colorOnBackground,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: theme.colorSurface,
  },
  selectedReminderTypeButton: {
    backgroundColor: theme.colorPrimaryButton,
    color: theme.colorOnPrimaryButton,
  },
  reminderTypeButtonText: {
    fontSize: 18,
    color: theme.colorOnSurface,
  },
  SelectedReminderTypeButtonText: {
    fontSize: 18,
    color: theme.colorOnPrimaryButton,
  },
});

export default AddReminderScreen;
