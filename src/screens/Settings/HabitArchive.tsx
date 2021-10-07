import React, { useMemo, useReducer, useEffect, useState } from 'react';
import { useColorScheme, StyleSheet, Text, View, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../../styles/themes';
import { StatisticsStackParamList, StatisticsScreenNavigationProps, StatisticsDetailsScreenNavigationProps } from '../../types/types';
import HabitListItem from '../../components/HabitListItem';
import { ClientHabit, HabitState } from '../../api/models/Habit';
import { HabitTrackerApi } from '../../api/HabitTrackerApi';
import { GetHabitsResponseBody } from '../../api/httpTypes/responses';
import { DateTime } from 'luxon';
import ModalMenu from '../../components/ModalMenu';
import getSocket from '../../utils/initialize-socket-io';
import Toast from 'react-native-root-toast';


interface State {
  habits: ClientHabit[];
  isLoading: boolean;
  errorMessage: string;
}

type Action =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS', habits: ClientHabit[] }
  | { type: 'FETCH_FAILURE', errorMessage: string };


const HabitArchiveScreen = ({ navigation }: StatisticsScreenNavigationProps) => {
  const habitTrackerApi = HabitTrackerApi.getInstance();

  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [selected, setSelected] = useState(null as string | null);

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

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

  const fetchArchivedHabits = async () => {
    dispatch({ type: 'FETCH_INIT' });

    const result = await habitTrackerApi.getHabits(undefined, undefined, undefined, 'archived');
    if (result.success) {
      const habits = result.value
        .map((habit) => ({ ...habit, creationDate: DateTime.fromISO(habit.creationDate) }))   // creationDate to luxon.DateTime
        .sort((a, b) => a.name.localeCompare(b.name));            // sort alphabetically
      dispatch({ type: 'FETCH_SUCCESS', habits: habits });
    }
    else {
      dispatch({ type: 'FETCH_FAILURE', errorMessage: result.error });

      Toast.show(t('habitArchiveLoadingFailed'), {
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
    fetchArchivedHabits();
  }, []);

  useEffect(() => {
    const socket = getSocket();

    socket.on('habitUpdated', fetchArchivedHabits);
    socket.on('habitDeleted', fetchArchivedHabits);

    return () => {
      socket.off('habitUpdated', fetchArchivedHabits);
      socket.off('habitDeleted', fetchArchivedHabits);
    };
  }, []);


  const openModalMenu = (habitId: string) => {
    setSelected(habitId);
    setMenuModalVisible(true);
  };

  const renderItem = ({ item }: { item: ClientHabit }) => {
    return (
      <View>
        <HabitListItem
          habitId={item.id}
          habitName={item.name}
          withArrow={false}
          onPress={openModalMenu}
          onLongPress={openModalMenu}
        />
      </View>
    );
  };

  return (
    <View style={dynamicStyles.container}>
      { state.habits.length === 0 ? (
        <View style={dynamicStyles.noHabitView}>
          <Text style={dynamicStyles.text}>{t('noHabitArchivedPresent')}</Text>
        </View>
      ) : (
        <FlatList
          data={state.habits}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View style={dynamicStyles.itemSeparatorView} />
          )}
          ListHeaderComponent={() => (
            <View style={dynamicStyles.itemSeparatorView} />
          )}
          ListFooterComponent={() => (
            <View style={dynamicStyles.itemSeparatorView} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}

      <ModalMenu
        visible={menuModalVisible}
        habitId={selected}
        forArchived={true}
        onRequestClose={() => setMenuModalVisible(false)}
      />
    </View>
  );
};


const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: theme.colorBackground,
  },
  noHabitView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colorOnBackground,
  },
  itemSeparatorView: {
    height: 1,
    width: '100%',
    backgroundColor: theme.colorListItemSeparator,
  },
});

export default HabitArchiveScreen;
