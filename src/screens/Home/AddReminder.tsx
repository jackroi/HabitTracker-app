import React, { useMemo, useState } from 'react';
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
import { t } from 'i18n-js';

import { Theme, getTheme } from '../../styles/themes';
import { AddHabitScreenNavigationProps, AddReminderScreenNavigationProps } from '../../types/types';
import ModalPicker from '../../components/ModalPicker';
import { HabitTrackerApi } from '../../api/HabitTrackerApi';
import { HabitType } from '../../api/models/Habit';
import LocationReminderSelector from '../../components/ReminderSelector/LocationReminderSelector';
import { ReminderInfo } from '../../types/Reminder';
import DailyTimeReminderSelector from '../../components/ReminderSelector/DailyTimeReminderSelector';
import WeeklyTimeReminderSelector from '../../components/ReminderSelector/WeeklyTimeReminderSelector';
import TimeReminderSelector from '../../components/ReminderSelector/TimeReminderSelector';


const AddReminderScreen = ({ navigation, route }: AddReminderScreenNavigationProps) => {
  const [reminderType, setReminderType] = useState('time' as ('time' | 'location'));

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const { habitId } = route.params;

  const onConfirmCallback = (reminderInfo: ReminderInfo) => {
    console.log('TODO');
  }

  return (
    <View style={dynamicStyles.container}>

      {/* Reminder "type" (time/location) switch */}
      <View style={dynamicStyles.reminderTypeSwitch}>

        {/* Time button */}
        <TouchableOpacity
          style={[
            dynamicStyles.reminderTypeButton,
            reminderType === 'time' ? dynamicStyles.selectedReminderTypeButton : null
          ]}
          activeOpacity={0.5}
          onPress={() => setReminderType('time')}
        >
          <Text style={dynamicStyles.reminderTypeButtonText}>Time</Text>
        </TouchableOpacity>


        {/* Location button */}
        <TouchableOpacity
          style={[
            dynamicStyles.reminderTypeButton,
            reminderType === 'location' ? dynamicStyles.selectedReminderTypeButton : null
          ]}
          activeOpacity={0.5}
          onPress={() => setReminderType('location')}
        >
          <Text style={dynamicStyles.reminderTypeButtonText}>Location</Text>
        </TouchableOpacity>

      </View>

      {/* Time/Location selection view */}
      { reminderType === 'time' ? (
        <TimeReminderSelector
          onConfirm={onConfirmCallback}
        />
      ) : (
        <LocationReminderSelector
          onConfirm={onConfirmCallback}
        />
      )}
      <View style={{ backgroundColor: 'red' }}>

      </View>

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
    borderWidth: 1,
    borderColor: theme.colorOnBackground,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: theme.colorBackground,
  },
  selectedReminderTypeButton: {
    backgroundColor: '#ffc014',
  },
  reminderTypeButtonText: {
    fontSize: 18,
    color: theme.colorOnBackground,
  },
});

export default AddReminderScreen;
