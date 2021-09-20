import React, { useState, useMemo, useEffect } from 'react';
import { useColorScheme, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { Theme, getTheme } from '../../styles/themes';
import { HabitType } from '../../api/models/Habit';
import { t } from 'i18n-js';
import { DailyReminderInfo, LocationReminderInfo, MonthlyReminderInfo, ReminderType, ReminderInfo, WeeklyReminderInfo } from '../../types/Reminder';
import Toast from 'react-native-root-toast';



type LocationReminderSelectorProps = {
  onConfirm: (reminderInfo: LocationReminderInfo) => void;
}



const LocationReminderSelector = ({ onConfirm }: LocationReminderSelectorProps) => {
  const [locationName, setLocationName] = useState('');
  const [location, setLocation] = useState(null as Location.LocationObject | null);
  const [selectedLocation, setSelectedLocation] = useState(null as LatLng | null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Location permission not granted')
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const onConfirmCallback = () => {
    const cleanedLocationName = locationName.trim();
    if (!selectedLocation || !cleanedLocationName) {
      // TODO i18n
      Toast.show('Missing location name or location marker', {
        duration: Toast.durations.LONG,
        position: -100,
        backgroundColor: theme.colorToastBackground,
        textColor: theme.colorToastText,
        opacity: 0.9,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      return;
    }
    const reminderInfo: LocationReminderInfo = {
      type: ReminderType.LOCATION,
      location: {
        name: cleanedLocationName,
      },
    };
    onConfirm(reminderInfo);
  };

  return (
    <View style={dynamicStyles.container}>

      {/* Location name text input */}
      <TextInput
        style={dynamicStyles.input}
        value={locationName}
        onChangeText={setLocationName}
        keyboardType={'default'}
        autoCapitalize={'sentences'}
        autoCompleteType={'off'}
        autoCorrect={false}
        textContentType={'location'}
        placeholder={t('locationName')}
      />

      {/* Map */}
      { location ? (
        <MapView
          style={dynamicStyles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.15,
            longitudeDelta: 0.15,
          }}
          onPress={(e) => setSelectedLocation(e.nativeEvent.coordinate)}
        >
          { selectedLocation ? (
            <Marker
              coordinate={selectedLocation || { latitude: location.coords.latitude, longitude: location.coords.longitude }}
            />
          ) : (
            null
          )}
        </MapView>
      ) : (
        <View style={dynamicStyles.activityIndicatorView}>
          <ActivityIndicator size={'large'} />
        </View>
      )}

      {/* Confirm button */}
      <TouchableOpacity
        style={dynamicStyles.confirmButton}
        onPress={onConfirmCallback}
      >
        <Text
          style={dynamicStyles.confirmButtonText}
        >
          {t('confirm')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: theme.colorBackground,
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
  map: {
    marginTop: 10,
    flex: 1,
    width: '100%',
  },
  activityIndicatorView: {
    marginTop: 10,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    width: '100%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: theme.colorPrimaryButton,
  },
  confirmButtonText: {
    fontSize: 20,
    color: theme.colorOnPrimaryButton,
  },
});

export default LocationReminderSelector;
