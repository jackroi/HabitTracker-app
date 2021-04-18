import React, { useMemo, useState } from 'react';
import {
  useColorScheme,
  GestureResponderEvent,
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../styles/themes';


const CATEGORIES = [
  'Productivity',
  'Learn',
  'Sport',
  'Football',
  'Test',
];

type CategoryPickerModalProps = {
  visible: boolean;
  onSelect: (category: string) => void;
  onRequestClose: () => void;
}

const CategoryPickerModal = ({ visible, onRequestClose, onSelect }: CategoryPickerModalProps) => {
  const [category, setCategory] = useState('');

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={dynamicStyles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={dynamicStyles.centeredView}>
            <View style={dynamicStyles.modalView}>

              <View style={dynamicStyles.container}>
                <View style={dynamicStyles.headerContainer}>
                  <Text style={dynamicStyles.titleText}>
                    {t('categorySelectionHeader')}
                  </Text>
                  <TouchableOpacity
                    style={dynamicStyles.closeButton}
                    onPress={onRequestClose}
                  >
                    <MaterialIcons name={'close'} size={30} color={theme.colorOnSurface} />
                  </TouchableOpacity>
                </View>

                <FlatList
                  style={{flexGrow: 0}}
                  data={CATEGORIES}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={dynamicStyles.listItem}
                      activeOpacity={0.5}
                      onPress={() => onSelect(item)}
                    >
                      <Text style={dynamicStyles.listItemText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={dynamicStyles.itemSeparatorView} />
                  )}
                />
                <View style={dynamicStyles.inputTextContainer}>
                  <TextInput
                    style={dynamicStyles.inputText}
                    value={category}
                    onChangeText={setCategory}
                    keyboardType={'default'}
                    autoCapitalize={'sentences'}
                    autoCompleteType={'off'}
                    autoCorrect={true}
                    textContentType={'none'}
                    placeholder={t('category')}
                    placeholderTextColor={theme.colorOnSurface}   // TODO colore migliore
                  />
                  <TouchableOpacity
                    style={dynamicStyles.confirmButton}
                    onPress={() => onSelect(category)}
                  >
                    <Text style={dynamicStyles.confirmButtonText}>{t('confirm')}</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const BORDER_RADIUS = 20;

const styles = (theme: Theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colorSurface,
    borderRadius: BORDER_RADIUS,
    width: '100%',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: 'transparent',
    borderRadius: BORDER_RADIUS,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '70%',
    width: '80%'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'nowrap',
    padding: 10,
  },
  titleText: {
    color: theme.colorOnSurface,
    fontSize: 20,
  },
  closeButton: {
    paddingLeft: 5,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 20,
    backgroundColor: theme.colorListItem,
  },
  listItemText: {
    color: theme.colorOnListItem,
  },
  itemSeparatorView: {
    height: 1,
    width: '100%',
    backgroundColor: theme.colorListItemSeparator,
  },
  inputTextContainer: {
    padding: 10
  },
  inputText: {
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
  confirmButton: {
    width: "100%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#ffc014",
  },
  confirmButtonText: {
    color: 'black'
  },
});


export default CategoryPickerModal;
