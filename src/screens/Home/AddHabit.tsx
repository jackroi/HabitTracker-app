import React, { useMemo, useState } from 'react';
import {
  useColorScheme,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../../styles/themes';


import { AddHabitScreenNavigationProps } from '../../types/types';

const AddHabitScreen = ({ navigation }: AddHabitScreenNavigationProps) => {
  const [habitName, setHabitName] = useState('');

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  return (
    <View style={dynamicStyles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={dynamicStyles.innerContainer}>
          <Text style={{color: 'white', fontSize: 30, marginBottom: 10, marginLeft: 15}}>
            {t('habit')}
          </Text>
          <TextInput
            style={dynamicStyles.input}
            value={habitName}
            onChangeText={setHabitName}
            keyboardType={'default'}
            autoCapitalize={'sentences'}
            autoCompleteType={'off'}
            autoCorrect={true}
            textContentType={'none'}
            placeholder={t('habit')}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorBackground,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  input: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: theme.colorOnBackground,
    alignItems: 'center',
    fontSize: 20,
  },
});

export default AddHabitScreen;
