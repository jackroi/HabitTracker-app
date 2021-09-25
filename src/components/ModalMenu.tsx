import React, { useMemo, useState, useEffect } from 'react';
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
  Keyboard,
  SafeAreaView
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { t } from 'i18n-js';

import { Theme, getTheme } from '../styles/themes';
import { HabitTrackerApi } from '../api/HabitTrackerApi';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';


type MenuItemProps = {
  title: string;
  icon: string;
  onPress: () => void;
}


const MenuItem = ({ title, icon, onPress }: MenuItemProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  return (
    <TouchableOpacity
      style={dynamicStyles.button}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <MaterialCommunityIcons name={icon as any} size={18} color={theme.colorOnListItem}/>
      <Text style={dynamicStyles.text}>{title}</Text>
      <MaterialCommunityIcons name={'greater-than'} size={18} color={theme.colorOnListItem}/>
    </TouchableOpacity>
  );
};


type CategoryPickerModalProps = {
  visible: boolean;
  habitId: string | null;
  forArchived: boolean;
  onRequestClose: () => void;
}

const ModalMenu = ({ visible, habitId, forArchived, onRequestClose }: CategoryPickerModalProps) => {
  const habitTrackerApi = HabitTrackerApi.getInstance();

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const navigation = useNavigation();

  const showArchiveHabitDialog = () => {
    return (
      Alert.alert(
        t('archiveHabit'),
        t('archiveHabitAlertMessage'),
        [
          {
            text: t('cancel'),
            style: 'cancel',
          },
          {
            text: t('archive'),
            style: 'default',
            onPress: async () => {
              if (!habitId) {
                return;
              }

              onRequestClose();

              const result = await habitTrackerApi.archiveHabit(habitId);
              if (!result.success) {
                Toast.show(t('archiveFailed'), {
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
            },
          }
        ],
        {
          cancelable: true,
        }
      )
    );
  };

  const unarchiveHabit = async () => {
    if (!habitId) {
      return;
    }

    onRequestClose();

    const result = await habitTrackerApi.unarchiveHabit(habitId);

    if (!result.success) {
      Toast.show(t('unarchiveFailed'), {
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
  }

  const showDeleteHabitDialog = () => {
    return (
      Alert.alert(
        t('deleteHabit'),
        t('deleteHabitAlertMessage'),
        [
          {
            text: t('cancel'),
            style: 'cancel',
          },
          {
            text: t('delete'),
            style: 'destructive',
            onPress: async () => {
              if (!habitId) {
                return;
              }

              onRequestClose();

              const result = await habitTrackerApi.deleteHabit(habitId);

              if (!result.success) {
                Toast.show(t('habitDeletionFailed'), {
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
            },
          }
        ],
        {
          cancelable: true,
        }
      )
    );
  };

  const onUpdateCallback = () => {
    navigation.navigate('UpdateHabit', { habitId: habitId });
    onRequestClose();
  };

  const onAddReminderCallback = () => {
    navigation.navigate('AddReminder', { habitId: habitId });
    onRequestClose();
  }

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <TouchableWithoutFeedback onPress={onRequestClose}>

        {/* View that covers all the screen */}
        <View
          style={dynamicStyles.container}
        >
          {/* View that contains the actual menu */}
          <View style={dynamicStyles.innerContainer}>
            {
              forArchived ? (
                null
              ) : (
                <MenuItem
                  title={'Add reminder'}
                  icon={'bell-outline'}
                  onPress={onAddReminderCallback}
                />
              )
            }
            {
              forArchived ? (
                null
              ) : (
                <MenuItem
                  title={'Update'}
                  icon={'pencil-box-outline'}
                  onPress={onUpdateCallback}
                />
              )
            }
            <MenuItem
              title={forArchived ? 'Unarchive' : 'Archive'}
              icon={'archive-arrow-down-outline'}
              onPress={forArchived ? unarchiveHabit : showArchiveHabitDialog}
            />
            <MenuItem
              title={'Delete'}
              icon={'delete-outline'}
              onPress={showDeleteHabitDialog}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const BORDER_RADIUS = 20;

const styles = (theme: Theme) => StyleSheet.create({
  container: {                        // covers all the screen
    flex: 1,
    justifyContent: 'flex-end',
  },
  innerContainer: {                   // contains the actual menu
    backgroundColor: theme.colorBackground,
    paddingBottom: 36,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 15,
    backgroundColor: theme.colorListItem,
    borderWidth: 1,
    borderColor: theme.colorListItemSeparator,
  },
  text: {
    fontSize: 18,
    color: theme.colorOnListItem,
  },
});


export default ModalMenu;
