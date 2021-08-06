import React, { useState, useMemo } from 'react';
import { useColorScheme, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DateTime } from 'luxon';

import { Theme, getTheme } from '../styles/themes';


type DatePickerProps = {
  fromDate: DateTime;
  onChange: (date: DateTime) => void;
}


const DatePicker = ({ fromDate, onChange }: DatePickerProps) => {
  const [date, setDate] = useState(DateTime.now().startOf('day'));

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const onPress = (which: 'prev' | 'next') => {
    let newDate;
    switch (which) {
      case 'prev':
        newDate = date.minus({ days: 1 });
        break;
      case 'next':
        newDate = date.plus({ days: 1 });
        break;
      default:
        const _exhaustiveCheck: never = which;
        return _exhaustiveCheck;
    }
    // modify date iff it is in the range [fromDate, today]
    if (newDate >= fromDate && newDate <= DateTime.now().startOf('day')) {
      setDate(newDate)
      onChange(newDate);
    }
  };

  const isButtonDisabled = (which: 'prev' | 'next') => {
    let disabled: boolean;
    switch (which) {
      case 'prev':
        disabled = date <= fromDate;
        break;
      case 'next':
        disabled = date >= DateTime.now().startOf('day');
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
        <MaterialCommunityIcons name={'less-than'} size={30} color={'#FFFFFF'}/>
      </TouchableOpacity>

      {/* Date display */}
      <View
        // TODO double press reset date to today
      >
        <Text style={dynamicStyles.text}>
          {date.year}/{date.month}/{date.day}
        </Text>
      </View>

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
        <MaterialCommunityIcons name={'greater-than'} size={30} color={'#FFFFFF'}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  // TODO
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
    // backgroundColor: theme.colorListItem,
  },
  disabledButton: {
    opacity: 0.5,
  },
  enabledButton: {
    opacity: 1,
  },
  text: {
    fontSize: 30,
    color: theme.colorOnBackground,
    fontWeight: 'bold',
  }
});

export default DatePicker;
