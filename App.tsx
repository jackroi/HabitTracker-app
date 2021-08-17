import React, { useReducer, useEffect, useMemo, useRef } from 'react';
import { AppState, AppStateStatus, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './src/i18n/en';
import it from './src/i18n/it';

import { getNavigationTheme } from './src/styles/themes'

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

  const theme = getNavigationTheme(useColorScheme());

  const habitTrackerApi = HabitTrackerApi.getInstance();

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: string | null = null;

      try {
        userToken = await SecureStore.getItemAsync('userToken');

        if (userToken) {
          // TODO validate token

          habitTrackerApi.setToken(userToken);

          const socket = getSocket();
          socket.emit('online', userToken);
        }

      } catch (error) {
        // Restoring token failed
        // TODO
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

          dispatch({ type: 'LOG_IN', token: token });
        }
        else {
          // TODO error handling
          console.warn('Login went wrong');
        }
      },
      logout: () => {
        SecureStore.deleteItemAsync('userToken');
        habitTrackerApi.unsetToken();
        const socket = getSocket();
        socket.emit('offline');

        // TODO eliminare tutte le notifiche

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

          dispatch({ type: 'LOG_IN', token: token });
        }
        else {
          // TODO error handling
          console.warn('Registration went wrong');
        }
      },
    }),
    []
  );

  const _handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/)
      && nextAppState === "active"
    ) {
      // App has come to the foreground!
      const socket = getSocket();
      // TODO apparently this is not needed, because it auto reconnects
      // socket.connect();

      // TODO must find a way to send 'online' events


      let userToken: string | null = null;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
        if (userToken) {
          console.log('emit online')
          socket.emit('online', userToken);
        }

      } catch (error) {
        // Restoring token failed
        // TODO
      }

      // if (state.userToken) {
      //   socket.emit('online', state.userToken);
      //   console.info('Reconnect to socket, sending online event, after coming to the foreground');
      // }
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
      theme={theme}
    >
      <StatusBar style="auto" />
      <AuthContext.Provider value={authContext}>
        {state.userToken === null ? (
          <AuthNavigator />
        ) : (
          <AppNavigator />
        )}
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
