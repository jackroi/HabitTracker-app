import React, { useContext, useMemo } from 'react';
import { useColorScheme, Button, StyleSheet, Text, View, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../../styles/themes';
import { SettingsStackParamList, SettingsScreenNavigationProps } from '../../types/types';
import AuthContext from '../../contexts/AuthContext';
import SettingsListItem from '../../components/SettingsListItem';
import AccountScreen from './Account';
import AboutScreen from './About';
import HabitArchiveScreen from './HabitArchive';


const SettingsScreen = ({ navigation }: SettingsScreenNavigationProps) => {
  const { logout } = useContext(AuthContext);

  const SETTINGS_ENTRIES = [
    {
      key: 'account',
      onPress: () => {
        navigation.navigate('Account' as any);
      },
    },
    {
      key: 'habitArchive',
      onPress: () => {
        navigation.navigate('HabitArchive' as any);
      },
    },
    {
      key: 'logout',
      onPress: () => logout(),
    },
    {
      key: 'about',
      onPress: () => {
        navigation.navigate('About' as any);
      }
    },
  ];


  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const renderItem = ({ item }: { item: { key: string, onPress: () => void } }) => {
    return (
      <View>
        <SettingsListItem
          title={t(item.key)}
          onPress={item.onPress}
        />
      </View>
    );
  };

  return (
    <View style={dynamicStyles.container}>
      <FlatList
        data={SETTINGS_ENTRIES}
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
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const SettingsStack = createStackNavigator<SettingsStackParamList>();

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator
      initialRouteName={'Settings'}
    >
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: t('settingsScreenTitle') }}
      />
      <SettingsStack.Screen
        name="Account"
        component={AccountScreen}
        options={{ title: t('settingsAccountScreenTitle') }}
      />
      <SettingsStack.Screen
        name="HabitArchive"
        component={HabitArchiveScreen}
        options={{ title: t('settingsArchiveScreenTitle') }}
      />
      <SettingsStack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: t('settingsAboutScreenTitle') }}
      />
    </SettingsStack.Navigator>
  );
};


const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorBackground,
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


export default SettingsStackScreen;
