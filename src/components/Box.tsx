import React, { useMemo, useReducer, useEffect } from 'react';
import { useColorScheme, StyleSheet, Text, View, FlatList } from 'react-native';


// NumberBox

type BoxProps = {
  title: string;
  value: string | null;
}

const Box = ({ title, value }: BoxProps) => {
  return (
    <View style={{
      width: '48%', flexDirection: 'column', backgroundColor: 'gray',
      alignItems: 'center', justifyContent: 'center', marginVertical: 7,
      paddingVertical: 30
    }}>
      <Text>{title}</Text>
      <Text style={{ fontSize: 40 }}>{value ? value : ''}</Text>
    </View>
  );
};

export default Box;
