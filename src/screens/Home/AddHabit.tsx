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
import CategoryPickerModal from '../../components/CategoryPickerModal';


const AddHabitScreen = ({ navigation }: AddHabitScreenNavigationProps) => {
  const [habitName, setHabitName] = useState('');
  const [category, setCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

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

          <Text style={dynamicStyles.sectionText}>
            {t('category')}
          </Text>

          {/* Category field */}
          <TouchableWithoutFeedback
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={[dynamicStyles.categoryText, category === '' ? dynamicStyles.categoryTextPlaceholder : {}]}
            >
              {category === '' ? t('selectCategory') : category}
            </Text>
          </TouchableWithoutFeedback>

          {/* Create habit button */}
          <TouchableOpacity
            style={dynamicStyles.createButton}
            onPress={() => {
              // TODO validate input
              // TODO send input to server
              // TODO add newly created habit to locally stored habit list
              navigation.goBack();
            }}
          >
            <Text style={dynamicStyles.createButtonText}>{t('create')}</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>

      <CategoryPickerModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onSelect={(category) => {
          setCategory(category);
          setModalVisible(false);
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
  categoryText: {
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
