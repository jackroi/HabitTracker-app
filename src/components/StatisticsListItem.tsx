import React, { useState, useMemo } from 'react';
import { useColorScheme, GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Theme, getTheme } from '../styles/themes';


type StatisticsListItemProps = {
  habitName: string;
  onPress?: (event: GestureResponderEvent) => void;
}


const StatisticsListitem = ({ habitName, onPress }: StatisticsListItemProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  return (
    <TouchableOpacity
      style={dynamicStyles.button}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <Text style={dynamicStyles.text}>{habitName}</Text>
      <MaterialCommunityIcons name={'greater-than'} size={18} color={'#FFFFFF'}/>
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
  }
});

export default StatisticsListitem;
