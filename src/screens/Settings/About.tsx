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
      <Text style={dynamicStyles.text}>Author: Giacomo Rosin</Text>
      <Text style={dynamicStyles.text}>Version: {pkg.version}</Text>
    </View>
  );
};


const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: theme.colorBackground,
  },
  text: {
    color: theme.colorOnBackground,
  },
});


export default AboutScreen;
