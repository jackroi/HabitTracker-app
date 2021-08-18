import React, { useMemo, useEffect, useState } from 'react';
import { useColorScheme, StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../../styles/themes';
import { HabitTrackerApi } from '../../api/HabitTrackerApi';
import { DateTime } from 'luxon';
import { AboutScreenNavigationProps } from '../../types/types';
import AuthContext from '../../contexts/AuthContext';

const pkg = require('../../../package.json');


const AboutScreen = ({ navigation, route }: AboutScreenNavigationProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);


  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.text}>Habit Tracker</Text>
      <Text style={dynamicStyles.text}>{t('author')}: Giacomo Rosin</Text>
      <Text style={dynamicStyles.text}>{t('version')}: {pkg.version}</Text>
    </View>
  );
};


const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: theme.colorBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colorOnBackground,
    fontSize: 20,
    padding: 10,
  },
});


export default AboutScreen;
