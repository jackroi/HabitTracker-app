import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { t } from 'i18n-js';

import { SettingsScreenNavigationProps } from '../types/types';
import AuthContext from '../contexts/AuthContext';


const SettingsScreen = ({ navigation }: SettingsScreenNavigationProps) => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>{t('settingsScreenTitle')}!</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Logout"
        onPress={() => logout() }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsScreen;
