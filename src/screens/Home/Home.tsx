import React, { useMemo, useReducer, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList, StatusBar, useColorScheme, TouchableOpacity, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../../styles/themes';
import { HomeStackParamList, HomeScreenNavigationProps } from '../../types/types';
import HabitButton from '../../components/HabitButton';
import AddHabitScreen from './AddHabit';
import DatePicker from '../../components/DatePicker';
import { DateTime } from 'luxon';
import { HabitTrackerApi } from '../../api/HabitTrackerApi';
import { ClientHabit, HabitState } from '../../api/models/Habit';
import ModalMenu from '../../components/ModalMenu';
import UpdateHabitScreen from './UpdateHabit';
import getSocket from '../../utils/initialize-socket-io';
import AddReminderScreen from './AddReminder';
import Toast from 'react-native-root-toast';


interface HabitView {
  id: string;
  name: string;
  state: HabitState;
}

const divideHabitBySection = (habits: (ClientHabit & { state: HabitState })[]) => {
  const sectionMap = new Map<string,HabitView[]>();

  for (let habit of habits) {
    if (!sectionMap.has(habit.category)) {
      sectionMap.set(habit.category, []);
    }
    sectionMap.get(habit.category)?.push({
      id: habit.id,
      name: habit.name,
      state: habit.state,
    });
  }

  const output = [];
  for (let key of sectionMap.keys()) {
    output.push({
      title: key,
      data: (sectionMap.get(key) as HabitView[]),
    });
  }

  // Sort sections alphabetically
  output.sort((a, b) => a.title.localeCompare(b.title));

  return output;
}


interface State {
  habits: (ClientHabit & { state: HabitState })[];
  isLoading: boolean;
  errorMessage: string;
}

type Action =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS', habits: (ClientHabit & { state: HabitState })[] }
  | { type: 'FETCH_FAILURE', errorMessage: string };


const HomeScreen = ({ navigation }: HomeScreenNavigationProps) => {
  const habitTrackerApi = HabitTrackerApi.getInstance();

  const [date, setDate] = useState(DateTime.now().startOf('day'));
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [longPressSelected, setLongPressSelected] = useState(null as string | null);

  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case 'FETCH_INIT':
          return {
            ...state,
            // habits: [],
            isLoading: true,
            errorMessage: '',
          };

        case 'FETCH_SUCCESS':
          return {
            ...state,
            habits: action.habits,
            isLoading: false,
            errorMessage: '',
          };

        case 'FETCH_FAILURE':
          return {
            ...state,
            habits: [],
            isLoading: false,
            errorMessage: action.errorMessage,
          };
      }
    },
    {
      habits: [],
      isLoading: false,
      errorMessage: '',
    }
  );

  const fetchHabits = async () => {
    dispatch({ type: 'FETCH_INIT' });

    const result = await habitTrackerApi.getHabitsForDate(date.toISODate());
    if (result.success) {
      const habits: (ClientHabit & { state: HabitState })[] = result.value
        .map(item => ({
          ...item,
          creationDate: DateTime.fromISO(item.creationDate),
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
      dispatch({ type: 'FETCH_SUCCESS', habits: habits });
    }
    else {
      dispatch({ type: 'FETCH_FAILURE', errorMessage: result.error });

      Toast.show(t('habitLoadingFailed'), {
        duration: Toast.durations.LONG,
        position: -100,
        backgroundColor: theme.colorToastBackground,
        textColor: theme.colorToastText,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [date]);

  useEffect(() => {
    const socket = getSocket();

    socket.on('habitCreated', fetchHabits);
    socket.on('habitUpdated', fetchHabits);
    socket.on('habitHistoryUpdated', fetchHabits);
    socket.on('habitDeleted', fetchHabits);

    return () => {
      socket.off('habitCreated', fetchHabits);
      socket.off('habitUpdated', fetchHabits);
      socket.off('habitHistoryUpdated', fetchHabits);
      socket.off('habitDeleted', fetchHabits);
    };
  }, [date]);

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const renderItem = ({ item }: { item: HabitView }) => {
    return (
      <View style={dynamicStyles.item}>
        <HabitButton
          habitId={item.id}
          habitName={item.name}
          habitState={item.state}
          onPress={async (habitId, habitState) => {
            let promise;
            switch (habitState) {
              case HabitState.COMPLETED:
                promise = habitTrackerApi.completeHabit(habitId, date);
                break;
              case HabitState.SKIPPED:
                promise = habitTrackerApi.skipHabit(habitId, date);
                break;
              case HabitState.NOT_COMPLETED:
                promise = habitTrackerApi.deleteHabitHistoryEntry(habitId, date);
                break;
              default:
                const _exhaustiveCheck: never = habitState;
                return _exhaustiveCheck;
            }
            const result = await promise;
            if (result.success) {
              console.info('Habit state updated succesfully');
            }
            else {
              console.warn('An error occurred while updating habit state');

              Toast.show(t('habitStateUpdateFailed'), {
                duration: Toast.durations.LONG,
                position: -100,
                backgroundColor: theme.colorToastBackground,
                textColor: theme.colorToastText,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
              });
            }
          }}
          onLongPress={(habitId) => {
            setLongPressSelected(habitId);
            setMenuModalVisible(true);
          }}
        />
      </View>
    );
  };

  const renderSectionHeader = ({ section: { title }}: { section: { title: string } }) => {
    return (
      <Text style={dynamicStyles.sectionHeader}>{title}</Text>
    );
  };

  return (
    <View style={dynamicStyles.container}>
      <DatePicker
        fromDate={DateTime.now().startOf('day').minus({ days: 60 })}
        currentDate={date}
        onChange={setDate}
      />
      { state.habits.length === 0 ? (
        <View style={dynamicStyles.noHabitView}>
          <Text style={dynamicStyles.text}>{t('noHabitPresent')}</Text>
        </View>
      ) : (
        <SectionList
          sections={divideHabitBySection(state.habits)}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
          keyExtractor={(item) => item.id + ' ' + date + ' ' + item.state}
          // extraData={date}
        />
      )}

      <ModalMenu
        visible={menuModalVisible}
        habitId={longPressSelected}
        forArchived={false}
        onRequestClose={() => setMenuModalVisible(false)}
      />
    </View>
  );
};


const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackScreen = () => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const navigation = useNavigation();

  return (
    <HomeStack.Navigator
      initialRouteName={'Home'}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t('homeScreenTitle'),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddHabit')}
              style={dynamicStyles.addButton}
            >
              <MaterialIcons name={'add'} size={30} color={theme.colorOnBackground} />
            </TouchableOpacity>
          )
        }}
      />
      <HomeStack.Screen
        name={'AddHabit'}
        component={AddHabitScreen}
        options={{ title: t('homeAddHabitScreenTitle') }}
      />
      <HomeStack.Screen
        name={'UpdateHabit'}
        component={UpdateHabitScreen}
        options={{ title: t('homeUpdateHabitScreenTitle') }}
      />
      <HomeStack.Screen
        name={'AddReminder'}
        component={AddReminderScreen}
        options={{ title: t('homeAddReminderScreenTitle') }}
      />
    </HomeStack.Navigator>
  );
}


const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorBackground,
    flexDirection: 'column',
  },
  sectionHeader: {
    backgroundColor: theme.colorBackground,
    color: theme.colorOnBackground,
    fontSize: 20,
    paddingVertical: 10,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  item: {
    marginVertical: 8,
    paddingHorizontal: 20,
  },
  addButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  noHabitView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colorOnBackground,
  },
});

export default HomeStackScreen;
