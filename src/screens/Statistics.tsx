import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { t } from 'i18n-js';

import { StatisticsScreenNavigationProps } from '../types/types';


const StatisticsScreen = ({ navigation }: StatisticsScreenNavigationProps) => {
  return (
    <View style={styles.container}>
      <Text>{t('statisticsScreenTitle')}!</Text>
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

export default StatisticsScreen;
