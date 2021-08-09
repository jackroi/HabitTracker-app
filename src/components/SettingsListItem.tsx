import React, { useState, useMemo } from 'react';
import { useColorScheme, GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Theme, getTheme } from '../styles/themes';


type SettingsListItemProps = {
  title: string;
  onPress: () => void;
}


const SettingsListItem = ({ title, onPress }: SettingsListItemProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  return (
    <TouchableOpacity
      style={dynamicStyles.button}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <Text style={dynamicStyles.text}>{title}</Text>
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
  },
});

export default SettingsListItem;
