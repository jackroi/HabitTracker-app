import React, { useMemo } from 'react';
import { useColorScheme, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../styles/themes';
import { HistoryStackParamList, HistoryScreenNavigationProps } from '../types/types';


const HistoryScreen = ({ navigation }: HistoryScreenNavigationProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.text}>{t('historyScreenTitle')}!</Text>
    </View>
  );
};


const HistoryStack = createStackNavigator<HistoryStackParamList>();

const HistoryStackScreen = () => {
  return (
    <HistoryStack.Navigator
      screenOptions={({ route }) => ({
        headerTitle: t('historyScreenTitle'),
      })}
    >
      <HistoryStack.Screen name="History" component={HistoryScreen} />
    </HistoryStack.Navigator>
  );
};


const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colorOnBackground,
  }
});


export default HistoryStackScreen;
