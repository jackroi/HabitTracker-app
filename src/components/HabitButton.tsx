import React, { useMemo, useState } from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { HabitState } from '../api/models/Habit';
import { getTheme, Theme } from '../styles/themes';


type HabitButtonProps = {
  habitId: string;
  habitName: string;
  habitState: HabitState;
  onPress: (habitId: string, habitState: HabitState) => void;
  onLongPress: (habitId: string) => void;
}

type UsedIcon =
  | 'check'
  | 'minus'
  | 'cross'

const HabitButton = ({ habitId, habitName, habitState, onPress, onLongPress }: HabitButtonProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const [currentHabitState, setCurrentHabitState] = useState(habitState);

  const getButtonConfig = (habitState: HabitState): [UsedIcon, string] => {
    switch (habitState) {
      case HabitState.COMPLETED:
        return ['check', theme.colorCompletedHabitButton];
      case HabitState.SKIPPED:
        return ['minus', theme.colorSkippedHabitButton];
      case HabitState.NOT_COMPLETED:
        return ['cross', theme.colorNotCompletedHabitButton];
      default:
        const _exhaustiveCheck: never = habitState;
        return _exhaustiveCheck;
    }
  };

  const onPressCallback = (event: GestureResponderEvent) => {
    let nextHabitState: HabitState;
    switch (currentHabitState) {
      case HabitState.NOT_COMPLETED:
        nextHabitState = HabitState.COMPLETED;
        break;
      case HabitState.COMPLETED:
        nextHabitState = HabitState.SKIPPED;
        break;
      case HabitState.SKIPPED:
        nextHabitState = HabitState.NOT_COMPLETED;
        break;
      default:
        const _exhaustiveCheck: never = currentHabitState;
        return _exhaustiveCheck;
    }
    setCurrentHabitState(nextHabitState);
    onPress(habitId, nextHabitState);
  }

  let [iconName, color] = getButtonConfig(currentHabitState);

  return (
    <TouchableOpacity
      style={[dynamicStyles.button, { backgroundColor: color }]}
      onPress={onPressCallback}
      onLongPress={() => onLongPress(habitId)}
      activeOpacity={0.5}
    >
      <Text style={dynamicStyles.text}>{habitName}</Text>
      <Entypo name={iconName} size={18} color={theme.colorOnHabitButton}/>
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
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: theme.colorOnHabitButton,
  },
});

export default HabitButton;
