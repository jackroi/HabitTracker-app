import React, { useMemo, useEffect, useState } from 'react';
import { useColorScheme, StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../../styles/themes';
import { HabitTrackerApi } from '../../api/HabitTrackerApi';
import { DateTime } from 'luxon';
import { AccountScreenNavigationProps } from '../../types/types';
import AuthContext from '../../contexts/AuthContext';
import Toast from 'react-native-root-toast';


const AccountScreen = ({ navigation, route }: AccountScreenNavigationProps) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    registrationDate: null,
  } as { name: string, email: string, registrationDate: DateTime | null });

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const { logout } = React.useContext(AuthContext);

  const habitTrackerApi = HabitTrackerApi.getInstance();

  useEffect(() => {
    const fetchAccountInformation = async () => {
      // TODO
      // TODO valutare eventualmente utilizzo di jwt token o Storage
      const result = await habitTrackerApi.getAccountInfo();
      if (result.success) {
        setState({
          name: result.value.name,
          email: result.value.email,
          registrationDate: DateTime.fromISO(result.value.registrationDate).startOf('day'),
        });
      }
      else {
        Toast.show(result.error, {
          duration: Toast.durations.LONG,
          position: -100,
          backgroundColor: theme.colorToastBackground,
          textColor: theme.colorToastText,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        console.warn('An error occurred while fetching account information');
      }
    };

    fetchAccountInformation();
  }, []);

  const showConfirmDialog = () => {
    return (
      Alert.alert(
        t('deleteAccount'),
        t('deleteAccountAlertMessage'),
        [
          {
            text: t('cancel'),
            style: 'cancel',
          },
          {
            text: t('delete'),
            style: 'destructive',
            onPress: () => {
              habitTrackerApi.deleteAccount();
              logout();
            },
          }
        ],
        {
          cancelable: true,
        }
      )
    );
  };

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.text}>{t('name')}: {state.name}</Text>
      <Text style={dynamicStyles.text}>{t('email')}: {state.email}</Text>
      <Text style={dynamicStyles.text}>{t('registrationDate')}: {state.registrationDate?.toISODate()}</Text>

      <TouchableOpacity
        style={dynamicStyles.deleteButton}
        onPress={showConfirmDialog}
      >
        <Text style={dynamicStyles.deleteButtonText}>{t('deleteAccount').toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorBackground,
    padding: 10,
  },
  text: {
    color: theme.colorOnBackground,
  },
  deleteButton: {
    width: '100%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: theme.colorDangerButton
  },
  deleteButtonText: {
    color: theme.colorOnDangerButton,
  }
});


export default AccountScreen;
