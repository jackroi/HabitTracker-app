import React, { useMemo, useState } from 'react';
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
import { AddHabitScreenNavigationProps } from '../../types/types';
import ModalPicker from '../../components/ModalPicker';
import { HabitTrackerApi } from '../../api/HabitTrackerApi';
import { HabitType } from '../../api/models/Habit';


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



const AddHabitScreen = ({ navigation }: AddHabitScreenNavigationProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [habitName, setHabitName] = useState('');
  const [habitCategory, setHabitCategory] = useState('');
  const [habitType, setHabitType] = useState('');
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [habitTypeModalVisible, setHabitTypeModalVisible] = useState(false);

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const habitTrackerApi = HabitTrackerApi.getInstance();

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
            value={habitName}
            onChangeText={setHabitName}
            keyboardType={'default'}
            autoCapitalize={'sentences'}
            autoCompleteType={'off'}
            autoCorrect={true}
            textContentType={'none'}
            placeholder={t('habit')}
          />

          {/* Category field */}
          <Text style={dynamicStyles.sectionText}>
            {t('category')}
          </Text>

          <TouchableWithoutFeedback
            onPress={() => setCategoryModalVisible(true)}
          >
            <Text
              style={[dynamicStyles.categoryText, habitCategory === '' ? dynamicStyles.categoryTextPlaceholder : {}]}
            >
              {habitCategory === '' ? t('selectCategory') : habitCategory}
            </Text>
          </TouchableWithoutFeedback>

          {/* Habit type field */}
          <Text style={dynamicStyles.sectionText}>
            Type
          </Text>

          <TouchableWithoutFeedback
            onPress={() => setHabitTypeModalVisible(true)}
          >
            <Text
              style={[dynamicStyles.categoryText, habitType === '' ? dynamicStyles.categoryTextPlaceholder : {}]}
            >
              {habitType === '' ? 'Select habit type' : habitType}
            </Text>
          </TouchableWithoutFeedback>

          {/* Create habit button */}
          <TouchableOpacity
            style={dynamicStyles.createButton}
            onPress={async () => {
              // TODO validate input
              const cleanedName = validateHabitName(habitName);
              if (!cleanedName) {
                setErrorMessage('Missing habit name');
                return;
              }
              const cleanedCategory = validateHabitCategory(habitCategory);
              if (!cleanedCategory) {
                setErrorMessage('Missing category');
                return;
              }
              const cleanedType = validateHabitType(habitType);
              if (!cleanedType) {
                setErrorMessage('Missing type');
                return;
              }
              // TODO send input to server
              const result = await habitTrackerApi.createHabit(cleanedName, cleanedCategory, cleanedType);
              if (!result.success) {
                console.warn('Create habit failed');
                setErrorMessage(result.error);
                return;
              }
              // TODO add newly created habit to locally stored habit list
              navigation.goBack();
            }}
          >
            <Text style={dynamicStyles.createButtonText}>{t('create')}</Text>
          </TouchableOpacity>

          {/* Error message banner */}
          {/* TODO use toast maybe */}
          <Text style={{ color: '#FF0000'}}>{errorMessage}</Text>

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
          setHabitCategory(category);
          setCategoryModalVisible(false);
        }}
      />

      {/* Habit type picker modal */}
      <ModalPicker
        data={['Daily','Weekly','Monthly']}
        withTextInput={false}
        headerText={'Seleziona una tipologia di habit'}
        visible={habitTypeModalVisible}
        onRequestClose={() => setHabitTypeModalVisible(false)}
        onSelect={(habitType) => {
          setHabitType(habitType);
          setHabitTypeModalVisible(false);
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
    color: 'gray',      // TODO placeholderColor (theme)
  },
  createButton: {
    width: "100%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#ffc014",
  },
  createButtonText: {
    color: 'white'
  },
});

export default AddHabitScreen;
