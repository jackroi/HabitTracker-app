import React, { useState, useMemo } from 'react';
import { useColorScheme, GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Theme, getTheme } from '../styles/themes';


type HabitListItemProps = {
  habitId: string;
  habitName: string;
  withArrow: boolean;
  onPress: (habitId: string) => void;
  onLongPress?: (habitId: string) => void;
}


const HabitListitem = ({ habitId, habitName, withArrow, onPress, onLongPress }: HabitListItemProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  return (
    <TouchableOpacity
      style={dynamicStyles.button}
      onPress={() => onPress(habitId)}
      onLongPress={() => onLongPress && onLongPress(habitId)}
      activeOpacity={0.5}
    >
      <Text style={dynamicStyles.text}>{habitName}</Text>
      { withArrow ? (
        <MaterialCommunityIcons name={'greater-than'} size={18} color={'#FFFFFF'}/>
      ) : (
        null
      )}
    </TouchableOpacity>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
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
    color: theme.colorOnListItem,
    fontWeight: 'bold',
  },
});

export default HabitListitem;
