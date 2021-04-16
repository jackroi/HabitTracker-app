import React, { useState } from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { HabitState } from '../types/types';



type habitButtonProps = {
  habitName: string;
  habitState: HabitState;
  onPress?: (event: GestureResponderEvent) => void;
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

const HabitButton = ({ habitName, habitState, onPress }: habitButtonProps) => {
  const [currentHabitState, setCurrentHabitState] = useState(habitState);

  const onPressCallback = (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event);
    }

    setCurrentHabitState((currentHabitState + 1) % (Object.keys(HabitState).length / 2))
  }

  let [iconName, color] = getButtonConfig(currentHabitState);

  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color}]}
      onPress={onPressCallback}
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
