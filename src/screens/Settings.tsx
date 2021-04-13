import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { SettingsScreenNavigationProps } from '../types/types';


const SettingsScreen = ({ navigation }: SettingsScreenNavigationProps) => {
  return (
    <View style={styles.container}>
      <Text>Settings!</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
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
