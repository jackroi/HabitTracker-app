import React, { useContext, useState, useMemo } from 'react';
import {
  useColorScheme,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  TouchableOpacity
} from 'react-native';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../styles/themes';
import { RegisterScreenNavigationProps } from '../types/types';
import AuthContext from '../contexts/AuthContext';
import Toast, { ToastOptions } from 'react-native-root-toast';
import { validateEmailRegex } from '../utils/utils';


const validateName = (name: string): string | null => {
  let cleanedName = name.trim();

  let valid = (cleanedName.length > 0);

  return valid ? cleanedName : null;
};

const validateEmail = (email: string): string | null => {
  let cleanedEmail = email.trim();

  let valid = (cleanedEmail.length > 0) && validateEmailRegex(cleanedEmail);

  return valid ? cleanedEmail : null;
};

const validatePassword = (password: string): string | null => {
  let valid = (password.length > 0);

  return valid ? password : null;
};

const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  let valid = (password.length > 0) && (password === confirmPassword);

  return valid ? password : null;
};


const LoginScreen = ({ navigation }: RegisterScreenNavigationProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register } = useContext(AuthContext);

  // dynamic styles for light/dark theme
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={dynamicStyles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={dynamicStyles.innerContainer}>
          <TextInput
            style={dynamicStyles.input}
            value={name}
            onChangeText={setName}
            keyboardType={'default'}
            autoCapitalize={'words'}
            autoCompleteType={'name'}
            autoCorrect={false}
            textContentType={'name'}
            placeholder={t('name')}
            placeholderTextColor={theme.colorPlaceholderText}
          />
          <TextInput
            style={dynamicStyles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            autoCompleteType={'email'}
            autoCorrect={false}
            textContentType={'emailAddress'}
            placeholder={t('email')}
            placeholderTextColor={theme.colorPlaceholderText}
          />
          <TextInput
            style={dynamicStyles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            textContentType={'newPassword'}
            placeholder={t('password')}
            placeholderTextColor={theme.colorPlaceholderText}
          />
          <TextInput
            style={dynamicStyles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            textContentType={'newPassword'}
            placeholder={t('confirmPassword')}
            placeholderTextColor={theme.colorPlaceholderText}
          />

          <TouchableOpacity
            style={dynamicStyles.registerButton}
            onPress={() => {
              Keyboard.dismiss();

              const toastOptions: ToastOptions = {
                duration: Toast.durations.LONG,
                position: -100,
                backgroundColor: theme.colorToastBackground,
                textColor: theme.colorToastText,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
              };

              // TODO i18n
              const cleanedName = validateName(email);
              if (!cleanedName) {
                Toast.show('Invalid name', toastOptions);
                return;
              }
              const cleanedEmail = validateEmail(email);
              if (!cleanedEmail) {
                Toast.show('Invalid email', toastOptions);
                return;
              }
              const cleanedPassword = validatePassword(password);
              if (!cleanedPassword) {
                Toast.show('Missing password', toastOptions);
                return;
              }
              const valid = validateConfirmPassword(password, confirmPassword);
              if (!valid) {
                Toast.show('The passwords don\'t match', toastOptions);
                return;
              }

              register({
                name: cleanedName,
                email: cleanedEmail,
                password: cleanedPassword,
              });
            }}
          >
            <Text style={dynamicStyles.registerButtonText}>{t('register')}</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: theme.colorBackground,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    width: '100%',
    margin: 12,
    paddingVertical:10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: theme.colorOnBackground,
    alignItems: 'center',
    fontSize: 20,
    color: theme.colorOnBackground,
  },
  registerButton: {
    width: '100%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: theme.colorPrimaryButton,
  },
  registerButtonText: {
    color: theme.colorOnPrimaryButton,
  },
});

export default LoginScreen;
