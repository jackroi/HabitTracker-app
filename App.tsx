import React, { useReducer, useEffect, useMemo, useRef } from 'react';
import { AppState, AppStateStatus, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as SecureStore from 'expo-secure-store';
import * as Localization from 'expo-localization';
import jwt_decode from "jwt-decode";
import i18n, { t } from 'i18n-js';
import en from './src/i18n/en';
import it from './src/i18n/it';

import { getNavigationTheme, getTheme } from './src/styles/themes'

import { AuthNavigator, AppNavigator } from './src/navigations';
import { SplashScreen } from './src/screens';
import AuthContext from './src/contexts/AuthContext';
import { HabitTrackerApi } from './src/api/HabitTrackerApi';
import * as Notifications from 'expo-notifications';

import * as RemindersDb from './src/db/reminders-db';
import * as NotificationsHelper from './src/utils/NotificationsHelper';

// Fix missing 'btoa' and 'atob'
import { encode, decode } from 'base-64';
import getSocket from './src/utils/initialize-socket-io';
import Toast from 'react-native-root-toast';
import { TokenData } from './src/types/TokenData';
import { Ok } from './src/utils/Result';
import { GetHabitsResponseBody } from './src/api/httpTypes/responses';
import { DbReminder } from './src/db/reminders-db';
import { DateTime } from 'luxon';
import { ClientHabit } from './src/api/models/Habit';
if (!global.btoa) { global.btoa = encode; }
if (!global.atob) { global.atob = decode; }

// @ts-ignore
navigator.__defineGetter__("userAgent", function () {   // you have to import rect native first !!
  return "react-native";
});

// set up i18n
i18n.translations = {
  en,
  it
};
i18n.locale = Localization.locale.split('-')[0];


const getHabitFromId = (habits: ClientHabit[], habitId: string): ClientHabit | null => {
  const habit = habits.find((item) => item.id === habitId);
  return habit || null;
};


interface State {
  isLoading: boolean;
  userToken: string | null;
}

type Action =
  | { type: 'RESTORE_TOKEN', token: string | null }
  | { type: 'LOG_IN', token: string }
  | { type: 'LOG_OUT' };



export default function App() {
  const appState = useRef(AppState.currentState);

  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            isLoading: false,
            userToken: action.token,
          };

        case 'LOG_IN':
          return {
            isLoading: false,
            userToken: action.token,
          };

        case 'LOG_OUT':
          return {
            isLoading: false,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      userToken: null,
    }
  );

  const theme = getTheme(useColorScheme());
  const navigationTheme = getNavigationTheme(useColorScheme());

  const habitTrackerApi = HabitTrackerApi.getInstance();

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: string | null = null;

      try {
        userToken = await SecureStore.getItemAsync('userToken');

        if (userToken) {
          habitTrackerApi.setToken(userToken);

          const socket = getSocket();
          socket.emit('online', userToken);
        }

      } catch (error) {
        // Failed to restore token
        console.error('An error occurred while restoring token');
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    }

    bootstrapAsync();
  }, []);

  useEffect(() => {
    console.info('Opening db...');
    const db = RemindersDb.openDatabase();
    console.info('Creating db table...');
    RemindersDb.createTable(db);
  }, []);


  const scheduleAllNotificationsAfterLogin = async () => {
    console.info('Rescheduling all notification');

    const token = await SecureStore.getItemAsync('userToken');
    const email = token ? (jwt_decode(token) as TokenData).email : '';

    const db = RemindersDb.openDatabase();

    const results = await Promise.all([
      habitTrackerApi.getHabits(),
      RemindersDb.getReminders(db),
    ]);

    NotificationsHelper.askNotificationPermission();

    for (let result of results) {
      if (!result.success) {
        console.error('Something went wrong while rescheduling notifications after login, ', result.error);
        return;
      }
    }

    const habitsResult = results[0] as Ok<GetHabitsResponseBody['habits'], never>;
    const habits = habitsResult.value.map((habit) => ({ ...habit, creationDate: DateTime.fromISO(habit.creationDate) }));

    const remindersResult = results[1] as Ok<DbReminder[], never>;

    for (let reminder of remindersResult.value) {
      if (reminder.email === email) {
        // Schedule all the reminders of the logged in user
        const habitName = getHabitFromId(habits, reminder.habitId)?.name;
        if (habitName) {      // The reminder refers to an existing habit
          const notificationId = await NotificationsHelper.scheduleNotification(habitName, reminder.reminderInfo);
          RemindersDb.updateReminderNotificationId(db, reminder.id, notificationId);
        }
      }
    }
  };


  const authContext = useMemo(() => ({
      login: async (data : { email: string, password: string }) => {

        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        const result = await habitTrackerApi.login(data.email, data.password);
        let token;
        if (result.success) {
          token = result.value;
          SecureStore.setItemAsync('userToken', token);

          habitTrackerApi.setToken(token);

          const socket = getSocket();
          socket.emit('online', token);

          scheduleAllNotificationsAfterLogin();

          dispatch({ type: 'LOG_IN', token: token });
        }
        else {
          Toast.show(t('loginFailed'), {
            duration: Toast.durations.LONG,
            position: -100,
            backgroundColor: theme.colorToastBackground,
            textColor: theme.colorToastText,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
          console.warn('Login went wrong');
        }
      },
      logout: async () => {
        SecureStore.deleteItemAsync('userToken');
        habitTrackerApi.unsetToken();
        const socket = getSocket();
        socket.emit('offline');

        // Disable reminders
        Notifications.cancelAllScheduledNotificationsAsync();

        dispatch({ type: 'LOG_OUT' })
      },
      register: async (data : { name: string, email: string, password: string }) => {

        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        const result = await habitTrackerApi.register(data.name, data.email, data.password);
        let token;
        if (result.success) {
          token = result.value;
          SecureStore.setItemAsync('userToken', token);

          habitTrackerApi.setToken(token);

          const socket = getSocket();
          socket.emit('online', token);

          scheduleAllNotificationsAfterLogin();

          dispatch({ type: 'LOG_IN', token: token });
        }
        else {
          let i18nKey;
          if (result.error.includes('already registered')) {
            i18nKey = 'emailAlreadyRegidtered';
          }
          else {
            i18nKey = 'registrationFailed';
          }
          Toast.show(t(i18nKey), {
            duration: Toast.durations.LONG,
            position: -100,
            backgroundColor: theme.colorToastBackground,
            textColor: theme.colorToastText,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });

          console.warn('Registration went wrong');
        }
      },
    }),
    [theme]
  );

  const _handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/)
      && nextAppState === "active"
    ) {
      // App has come to the foreground!
      const socket = getSocket();
      // socket.connect();                      // not needed, it auto reconnects

      let userToken: string | null = null;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
        if (userToken) {
          console.log('emit online')
          socket.emit('online', userToken);
        }

      } catch (error) {
        // Failed to restore token
        console.error('An error occurred while restoring token');
      }
    }

    appState.current = nextAppState;
  };

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);


  useEffect(() => {
    const socket = getSocket();
    socket.on('accountDeleted', () => {
      authContext.logout();
    });
  }, []);


  if (state.isLoading) {
    return (
      <View>
        <StatusBar style="auto" />
        <SplashScreen />
      </View>
    )
  }

  return (
    <NavigationContainer
      theme={navigationTheme}
    >
      <StatusBar style="auto" />
      <RootSiblingParent>
        <AuthContext.Provider value={authContext}>
          {state.userToken === null ? (
            <AuthNavigator />
          ) : (
            <AppNavigator />
          )}
        </AuthContext.Provider>
      </RootSiblingParent>
    </NavigationContainer>
  );
}
