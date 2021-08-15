import React, { useState, useMemo, useEffect } from 'react';
import { useColorScheme, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import { Theme, getTheme } from '../../styles/themes';
import { HabitType } from '../../api/models/Habit';
import { t } from 'i18n-js';
import { ReminderType, MonthlyReminderInfo } from '../../types/Reminder';



type MonthlyTimeReminderSelectorProps = {
  onConfirm: (reminderInfo: MonthlyReminderInfo) => void;
}



const MonthlyTimeReminderSelector = ({ onConfirm }: MonthlyTimeReminderSelectorProps) => {
  const [monthTime, setMonthTime] = useState('monthStart' as MonthlyReminderInfo['time']['monthTime']);

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const onConfirmCallback = () => {
    const reminderInfo: MonthlyReminderInfo = {
      type: ReminderType.MONTHLY,
      time: {
        monthTime: monthTime,
      },
    };
    onConfirm(reminderInfo);
  };

  return (
    <View style={dynamicStyles.container}>

      {/* Time picker */}
      <View style={dynamicStyles.pickerView}>

        {/* Month time picker */}
        <Picker
          style={dynamicStyles.monthTimePicker}
          selectedValue={monthTime}
          onValueChange={(itemValue, itemIndex) =>
            setMonthTime(itemValue)
          }
        >
          {
            ['monthStart','monthHalf','monthEnd'].map((monthTime) => (
              <Picker.Item
                key={monthTime}
                label={t(monthTime)}
                value={monthTime}
                color={theme.colorOnBackground}
              />
            ))
          }
        </Picker>
      </View>

      {/* Confirm button */}
      <TouchableOpacity
        style={dynamicStyles.confirmButton}
        onPress={onConfirmCallback}
      >
        <Text
          style={dynamicStyles.confirmButtonText}
        >
          Confirm
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
  monthTimePicker: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: theme.colorSurface,
  },
  confirmButton: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#ffc014",
  },
  confirmButtonText: {
    fontSize: 20,
  },
});

export default MonthlyTimeReminderSelector;
