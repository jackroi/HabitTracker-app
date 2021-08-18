import React, { useState, useMemo, useEffect } from 'react';
import { useColorScheme, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import { Theme, getTheme } from '../../styles/themes';
import { HabitType } from '../../api/models/Habit';
import { t } from 'i18n-js';
import { DailyReminderInfo, LocationReminderInfo, MonthlyReminderInfo, ReminderType, ReminderInfo, WeeklyReminderInfo } from '../../types/Reminder';



type WeeklyTimeReminderSelectorProps = {
  onConfirm: (reminderInfo: WeeklyReminderInfo) => void;
}



const WeeklyTimeReminderSelector = ({ onConfirm }: WeeklyTimeReminderSelectorProps) => {
  const [weekday, setWeekday] = useState('monday' as WeeklyReminderInfo['time']['dayOfWeek']);
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const onConfirmCallback = () => {
    const reminderInfo: WeeklyReminderInfo = {
      type: ReminderType.WEEKLY,
      time: {
        dayOfWeek: weekday,
        hours: hours,
        minutes: minutes,
      },
    };
    onConfirm(reminderInfo);
  };

  return (
    <View style={dynamicStyles.container}>

      {/* Time picker */}
      <View style={dynamicStyles.pickerView}>

        {/* Weekday picker */}
        <Picker
          style={dynamicStyles.weekdayPicker}
          selectedValue={weekday}
          onValueChange={(itemValue, itemIndex) =>
            setWeekday(itemValue)
          }
        >
          {
            ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'].map((weekday) => (
              <Picker.Item
                key={weekday}
                label={t(weekday)}
                value={weekday}
                color={theme.colorOnBackground}
              />
            ))
          }
        </Picker>

        {/* Hours and minutes pickers */}
        <View style={dynamicStyles.hoursMinutesPickerView}>
          {/* Hours picker */}
          <Picker
            style={dynamicStyles.hoursMinutesPicker}
            selectedValue={hours}
            onValueChange={(itemValue, itemIndex) =>
              setHours(itemValue)
            }
          >
            {
              Array.from(Array(24).keys()).map((hour) => (
                <Picker.Item
                  key={hour}
                  label={hour.toString()}
                  value={hour}
                  color={theme.colorOnBackground}
                />
              ))
            }
          </Picker>

          {/* Minutes picker */}
          <Picker
            style={dynamicStyles.hoursMinutesPicker}
            selectedValue={minutes}
            onValueChange={(itemValue, itemIndex) =>
              setMinutes(itemValue)
            }
          >
            {
              Array.from(Array(60).keys()).map((minute) => (
                <Picker.Item
                  key={minute}
                  label={minute.toString().padStart(2, '0')}
                  value={minute}
                  color={theme.colorOnBackground}
                />
              ))
            }
          </Picker>
        </View>
      </View>

      {/* Confirm button */}
      <TouchableOpacity
        style={dynamicStyles.confirmButton}
        onPress={onConfirmCallback}
      >
        <Text
          style={dynamicStyles.confirmButtonText}
        >
          {t('confirm')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: theme.colorBackground,
  },
  pickerView: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  hoursMinutesPickerView: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weekdayPicker: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: theme.colorSurface,
  },
  hoursMinutesPicker: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: theme.colorSurface,
  },
  confirmButton: {
    width: '100%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: theme.colorPrimaryButton,
  },
  confirmButtonText: {
    fontSize: 20,
    color: theme.colorOnPrimaryButton,
  },
});

export default WeeklyTimeReminderSelector;
