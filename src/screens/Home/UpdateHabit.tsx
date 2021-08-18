import React, { useMemo, useState, useEffect, useReducer } from 'react';
import {
  useColorScheme,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../../styles/themes';
import { AddHabitScreenNavigationProps, UpdateHabitScreenNavigationProps } from '../../types/types';
import ModalPicker from '../../components/ModalPicker';
import { HabitTrackerApi } from '../../api/HabitTrackerApi';
import { ClientHabit, HabitType } from '../../api/models/Habit';
import { DateTime } from 'luxon';


const validateHabitName = (habitName: string): string | null => {
  let cleanedName = habitName.trim();
  return (cleanedName.length > 0) ? cleanedName : null;
};

const validateHabitCategory = (habitCategory: string): string | null => {
  let cleanedCategory = habitCategory.trim();
  return (cleanedCategory.length > 0) ? cleanedCategory : null;
};

const validateHabitType = (habitType: string): HabitType | null => {
  let cleanedType: HabitType | null;
  switch (habitType.toUpperCase()) {
    case HabitType.DAILY:
      cleanedType = HabitType.DAILY;
      break;
    case HabitType.WEEKLY:
      cleanedType = HabitType.WEEKLY;
      break;
    case HabitType.MONTHLY:
      cleanedType = HabitType.MONTHLY;
      break;
    default:
      cleanedType = null;
  }
  return cleanedType;
};




interface State {
  habit: {
    name: string,
    category: string,
  };
  isLoading: boolean;
  errorMessage: string;
}

type Action =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS', habit: { name: string, category: string } }
  | { type: 'FETCH_FAILURE', errorMessage: string }
  | { type: 'NAME_UPDATED', name: string }
  | { type: 'CATEGORY_UPDATED', category: string }
  | { type: 'VALIDATION_ERROR', errorMessage: string };





const UpdateHabitScreen = ({ navigation, route }: UpdateHabitScreenNavigationProps) => {

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const habitTrackerApi = HabitTrackerApi.getInstance();

  const { habitId } = route.params;

  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case 'FETCH_INIT':
          return {
            ...state,
            habit: {
              name: '',
              category: '',
            },
            isLoading: true,
            errorMessage: '',
          };

        case 'FETCH_SUCCESS':
          return {
            ...state,
            habit: action.habit,
            isLoading: false,
            errorMessage: '',
          };

        case 'FETCH_FAILURE':
          return {
            ...state,
            habit: {
              name: '',
              category: '',
            },
            isLoading: false,
            errorMessage: action.errorMessage,
          };

        case 'NAME_UPDATED':
          return {
            ...state,
            habit: {
              ...state.habit,
              name: action.name,
            },
          };

        case 'CATEGORY_UPDATED':
          return {
            ...state,
            habit: {
              ...state.habit,
              category: action.category,
            },
          };

        case 'VALIDATION_ERROR':
          return {
            ...state,
            errorMessage: action.errorMessage,
          };
      }
    },
    {
      habit: {
        name: '',
        category: '',
      },
      isLoading: false,
      errorMessage: '',
    }
  );

  useEffect(() => {
    const fetchHabit = async () => {
      dispatch({ type: 'FETCH_INIT' });

      const result = await habitTrackerApi.getHabit(habitId);

      if (result.success) {
        const habit = { name: result.value.name, category: result.value.category };

        dispatch({ type: 'FETCH_SUCCESS', habit: habit });
      }
      else {
        dispatch({ type: 'FETCH_FAILURE', errorMessage: result.error });
      }
    }

    fetchHabit();
  }, [habitId]);

  return (
    <View style={dynamicStyles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={dynamicStyles.innerContainer}>
          {/* Habit name field */}
          <Text style={dynamicStyles.sectionText}>
            {t('habit')}
          </Text>
          <TextInput
            style={dynamicStyles.input}
            value={state.habit.name}
            onChangeText={(newText) => dispatch({ type: 'NAME_UPDATED', name: newText })}
            keyboardType={'default'}
            autoCapitalize={'sentences'}
            autoCompleteType={'off'}
            autoCorrect={true}
            textContentType={'none'}
            placeholder={t('habit')}
            placeholderTextColor={theme.colorPlaceholderText}
          />

          {/* Category field */}
          <Text style={dynamicStyles.sectionText}>
            {t('category')}
          </Text>

          <TouchableWithoutFeedback
            onPress={() => setCategoryModalVisible(true)}
          >
            <Text
              style={[dynamicStyles.categoryText, state.habit.category === '' ? dynamicStyles.categoryTextPlaceholder : {}]}
            >
              {state.habit.category === '' ? t('selectCategory') : state.habit.category}
            </Text>
          </TouchableWithoutFeedback>

          {/* Update habit button */}
          <TouchableOpacity
            style={dynamicStyles.createButton}
            onPress={async () => {
              // TODO validate input
              const cleanedName = validateHabitName(state.habit.name);
              if (!cleanedName) {
                dispatch({ type: 'VALIDATION_ERROR', errorMessage: 'Missing name' });
                return;
              }
              const cleanedCategory = validateHabitCategory(state.habit.category);
              if (!cleanedCategory) {
                dispatch({ type: 'VALIDATION_ERROR', errorMessage: 'Missing category' });
                return;
              }
              // TODO send input to server
              const result = await habitTrackerApi.updateHabit(habitId, cleanedName, cleanedCategory);
              if (!result.success) {
                console.warn('Update habit failed');
                dispatch({ type: 'VALIDATION_ERROR', errorMessage: result.error });
                return;
              }
              // TODO update local stored habit ???
              navigation.goBack();
            }}
          >
            <Text style={dynamicStyles.updateButtonText}>{t('update')}</Text>
          </TouchableOpacity>

          {/* Error message banner */}
          {/* TODO use toast maybe */}
          <Text style={{ color: '#FF0000'}}>{state.errorMessage}</Text>

        </View>
      </TouchableWithoutFeedback>

      {/* Category picker modal */}
      <ModalPicker
        // data={['Productivity','Learn','Sport','Football','Test']}
        data={async () => {
          const result = await habitTrackerApi.getCategories();
          if (result.success) {
            return result.value;
          }
          else {
            console.warn('Get categories failed');
            return [];
          }
        }}
        withTextInput={true}
        headerText={t('categorySelectionHeader')}
        textInputText={t('category')}
        visible={categoryModalVisible}
        onRequestClose={() => setCategoryModalVisible(false)}
        onSelect={(category) => {
          dispatch({ type: 'CATEGORY_UPDATED', category: category });
          setCategoryModalVisible(false);
        }}
      />

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
  },
  sectionText: {
    color: theme.colorOnBackground,
    fontSize: 30,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 15,
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
    color: theme.colorOnBackground,
  },
  categoryText: {   // TODO rename
    width: '100%',
    color: theme.colorOnBackground,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderRadius: 23,
    borderColor: theme.colorOnBackground,
    alignItems: 'center',
    fontSize: 20,
  },
  categoryTextPlaceholder: {
    color: theme.colorPlaceholderText,
  },
  createButton: {
    width: '100%',
    borderRadius: 25,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: theme.colorPrimaryButton,
  },
  updateButtonText: {
    color: theme.colorOnPrimaryButton,
  },
});

export default UpdateHabitScreen;
