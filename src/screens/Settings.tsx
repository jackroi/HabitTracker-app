import React, { useContext, useMemo } from 'react';
import { useColorScheme, Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../styles/themes';
import { SettingsStackParamList, SettingsScreenNavigationProps } from '../types/types';
import AuthContext from '../contexts/AuthContext';


const SettingsScreen = ({ navigation }: SettingsScreenNavigationProps) => {
  const { logout } = useContext(AuthContext);

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.text}>{t('settingsScreenTitle')}!</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home' as any)}
      />
      <Button
        title="Logout"
        onPress={() => logout() }
      />
    </View>
  );
};

const SettingsStack = createStackNavigator<SettingsStackParamList>();

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={({ route }) => ({
        headerTitle: t('settingsScreenTitle'),
      })}
    >
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}


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


export default SettingsStackScreen;
