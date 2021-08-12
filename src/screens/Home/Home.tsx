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



interface HabitView {
  id: string;
  name: string;
  state: HabitState;
}


const FAKE_DATA_1: HabitView[] = [
  {
    id: "0",
    name: "Run",
    state: HabitState.NOT_COMPLETED,
  },
  {
    id: "1",
    name: "Study",
    state: HabitState.NOT_COMPLETED,
  },
  {
    id: "2",
    name: "Watch",
    state: HabitState.NOT_COMPLETED,
  },
  {
    id: "3",
    name: "Jump",
    state: HabitState.NOT_COMPLETED,
  },
];

const FAKE_DATA_2: HabitView[] = [
  {
    id: "4",
    name: "Hide",
    state: HabitState.NOT_COMPLETED,
  },
  {
    id: "5",
    name: "Search",
    state: HabitState.NOT_COMPLETED,
  },
  {
    id: "6",
    name: "Drive",
    state: HabitState.NOT_COMPLETED,
  },
  {
    id: "7",
    name: "Go",
    state: HabitState.NOT_COMPLETED,
  },
];

const DATA = [
  {
    title: 'Productivity',
    data: FAKE_DATA_1,
  },
  {
    title: 'Sport',
    data: FAKE_DATA_2,
  },
];



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
      data: sectionMap.get(key) as HabitView[],
    });
  }

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
          // TODO aggiungere uno spinner per la fase di loading
          return {
            ...state,
            // habits: [],     // TODO valutare
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
            habits: [],     // TODO valutare se lasciare la lista precedente all'errore
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
      const habits: (ClientHabit & { state: HabitState })[] = result.value.map(item => ({
        ...item,
        creationDate: DateTime.fromISO(item.creationDate),
      }));
      dispatch({ type: 'FETCH_SUCCESS', habits: habits });
    }
    else {
      dispatch({ type: 'FETCH_FAILURE', errorMessage: result.error });
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [date]);

  useEffect(() => {
    const socket = getSocket();
    socket.on('habitCreated', () => {
      console.info('received event:','habitCreated')
      fetchHabits();
    });
    socket.on('habitUpdated', () => {
      console.info('received event:','habitUpdated')
      fetchHabits();
    });
    socket.on('habitHistoryUpdated', () => {
      console.info('received event:','habitHistoryUpdated')
      fetchHabits();
    });
    socket.on('habitDeleted', () => {
      console.info('received event:','habitDeleted')
      fetchHabits();
    });
  }, []);

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
              // TODO better error handling ?
              // TODO maybe i should change the UI state back
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
        fromDate={DateTime.now().startOf('day').minus({ days: 15 })}    // TODO
        currentDate={date}
        onChange={setDate}                         // TODO
      />
      <SectionList
        sections={divideHabitBySection(state.habits)}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item) => item.id + ' ' + date + ' ' + item.state}
        // extraData={date}
      />

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
      screenOptions={({ route }) => ({
        headerTitle: t('homeScreenTitle'),
      })}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
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
      <HomeStack.Screen name={'AddHabit'} component={AddHabitScreen} />
      <HomeStack.Screen name={'UpdateHabit'} component={UpdateHabitScreen} />
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
    fontWeight: 'bold'
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
});

export default HomeStackScreen;
