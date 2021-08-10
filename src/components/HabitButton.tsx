import React, { useState } from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { HabitState } from '../api/models/Habit';




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

const getButtonConfig = (habitState: HabitState): [UsedIcon, string] => {
  switch (habitState) {
    case HabitState.COMPLETED:
      return ['check', '#009688'];
    case HabitState.SKIPPED:
      return ['minus', '#967a00'];
    case HabitState.NOT_COMPLETED:
      return ['cross', '#e65441'];
    default:
      const _exhaustiveCheck: never = habitState;
      return _exhaustiveCheck;
  }
}

const HabitButton = ({ habitId, habitName, habitState, onPress, onLongPress }: HabitButtonProps) => {
  const [currentHabitState, setCurrentHabitState] = useState(habitState);

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
      style={[styles.button, {backgroundColor: color}]}
      onPress={onPressCallback}
      onLongPress={() => onLongPress(habitId)}
      activeOpacity={0.5}
    >
      <Text style={styles.text}>{habitName}</Text>
      <Entypo name={iconName} size={18} color={'#FFFFFF'}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 30,
    borderRadius: 10,
    backgroundColor: "#009688",
  },
  text: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase"
  }
});

export default HabitButton;
