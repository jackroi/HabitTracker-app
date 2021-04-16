import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { t } from 'i18n-js';

import { HistoryScreenNavigationProps } from '../types/types';


const HistoryScreen = ({ navigation }: HistoryScreenNavigationProps) => {
  return (
    <View style={styles.container}>
      {/* <Text>{t('historyScreenTitle')}!</Text> */}
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

export default HistoryScreen;
