import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const SplashScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>Splash screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
