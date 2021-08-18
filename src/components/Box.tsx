import React, { useMemo, useReducer, useEffect } from 'react';
import { useColorScheme, StyleSheet, Text, View, FlatList } from 'react-native';

import { Theme, getTheme } from '../styles/themes';

// NumberBox

type BoxProps = {
  title: string;
  value: string | null;
}

const Box = ({ title, value }: BoxProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.text}>{title}</Text>
      <Text style={[dynamicStyles.text, dynamicStyles.numberText]}>
        {value ? value : ''}
      </Text>
    </View>
  );
};


const styles = (theme: Theme) => StyleSheet.create({
  container: {
    width: '48%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 7,
    paddingVertical: 30,
    backgroundColor: theme.colorSurface,
  },
  text: {
    color: theme.colorOnSurface,
  },
  numberText: {
    fontSize: 40,
  },
});

export default Box;
