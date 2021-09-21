import React, { useState, useMemo } from 'react';
import { useColorScheme, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DateTime } from 'luxon';

import { Theme, getTheme } from '../styles/themes';


type DatePickerProps = {
  fromDate: DateTime;
  currentDate: DateTime;
  onChange: (date: DateTime) => void;
}


let pressCount = 0;
let pressTimer: NodeJS.Timeout;

const DatePicker = ({ fromDate, currentDate, onChange }: DatePickerProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const onPress = (which: 'prev' | 'next') => {
    let newDate;
    switch (which) {
      case 'prev':
        newDate = currentDate.minus({ days: 1 });
        break;
      case 'next':
        newDate = currentDate.plus({ days: 1 });
        break;
      default:
        const _exhaustiveCheck: never = which;
        return _exhaustiveCheck;
    }
    // modify date iff it is in the range [fromDate, today]
    if (newDate >= fromDate && newDate <= DateTime.now().startOf('day')) {
      // setDate(newDate);
      onChange(newDate);
    }
  };

  const isButtonDisabled = (which: 'prev' | 'next') => {
    let disabled: boolean;
    switch (which) {
      case 'prev':
        disabled = currentDate <= fromDate;
        break;
      case 'next':
        disabled = currentDate >= DateTime.now().startOf('day');
        break;
      default:
        const _exhaustiveCheck: never = which;
        return _exhaustiveCheck;
    }
    return disabled;
  }

  return (
    <View style={dynamicStyles.container}>
      {/* Previous date button (left button) */}
      <TouchableOpacity
        style={[
          dynamicStyles.button,
          isButtonDisabled('prev') ? dynamicStyles.disabledButton : dynamicStyles.enabledButton
        ]}
        onPress={() => onPress('prev')}
        activeOpacity={0.5}
        disabled={isButtonDisabled('prev')}
      >
        <MaterialCommunityIcons name={'less-than'} size={30} color={theme.colorOnBackground}/>
      </TouchableOpacity>

      {/* Date display */}
      <TouchableWithoutFeedback
        onPress={() => {
          // Double press listener
          pressCount++;
          if (pressCount === 2) {
            // Pressed twice
            clearTimeout(pressTimer);
            pressCount = 0;
            const today = DateTime.now().startOf('day');
            if (!currentDate.hasSame(today, 'day')) {   // if currentDate is not already today
              onChange(today);
            }
          } else {
            pressTimer = setTimeout(() => {
              pressCount = 0;
            }, 500);
          }
        }}
      >
        <Text style={dynamicStyles.text}>
          {currentDate.year}/{currentDate.month}/{currentDate.day}
        </Text>
      </TouchableWithoutFeedback>

      {/* Next date button (right button) */}
      <TouchableOpacity
        style={[
          dynamicStyles.button,
          isButtonDisabled('next') ? dynamicStyles.disabledButton : dynamicStyles.enabledButton
        ]}
        onPress={() => onPress('next')}
        activeOpacity={0.5}
        disabled={isButtonDisabled('next')}
      >
        <MaterialCommunityIcons name={'greater-than'} size={30} color={theme.colorOnBackground}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.colorBackground,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  disabledButton: {
    opacity: 0.3,
  },
  enabledButton: {
    opacity: 1,
  },
  text: {
    fontSize: 30,
    color: theme.colorOnBackground,
    fontWeight: 'bold',
  },
});

export default DatePicker;
