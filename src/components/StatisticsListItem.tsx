import React, { useState } from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


type StatisticsListItemProps = {
  habitName: string;
  onPress?: (event: GestureResponderEvent) => void;
}


const StatisticsListitem = ({ habitName, onPress }: StatisticsListItemProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <Text style={styles.text}>{habitName}</Text>
      <MaterialCommunityIcons name={'greater-than'} size={18} color={'#FFFFFF'}/>
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
    backgroundColor: '#2b2b2b',
  },
  text: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  }
});

export default StatisticsListitem;
