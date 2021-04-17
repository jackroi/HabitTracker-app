import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { t } from 'i18n-js';

import { HistoryScreenNavigationProps } from '../types/types';


const HistoryScreen = ({ navigation }: HistoryScreenNavigationProps) => {
  return (
    <View style={styles.container}>
      <Text>{t('historyScreenTitle')}!</Text>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HistoryScreen;
