import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { HomeScreenNavigationProps } from '../types/types';


const HomeScreen = ({ navigation }: HomeScreenNavigationProps) => {
  return (
    <View style={styles.container}>
      <Text>Home!</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
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

export default HomeScreen;
