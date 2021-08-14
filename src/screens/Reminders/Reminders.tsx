import React, { useMemo } from 'react';
import { useColorScheme, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../../styles/themes';
import { RemindersStackParamList, RemindersScreenNavigationProps } from '../../types/types';


const RemindersScreen = ({ navigation }: RemindersScreenNavigationProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.text}>{t('remindersScreenTitle')}!</Text>
    </View>
  );
};


const RemindersStack = createStackNavigator<RemindersStackParamList>();

const RemindersStackScreen = () => {
  return (
    <RemindersStack.Navigator
      screenOptions={({ route }) => ({
        headerTitle: t('remindersScreenTitle'),
      })}
    >
      <RemindersStack.Screen name="Reminders" component={RemindersScreen} />
    </RemindersStack.Navigator>
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


export default RemindersStackScreen;
