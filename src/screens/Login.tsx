import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  TouchableOpacity,
  useColorScheme
} from 'react-native';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../styles/themes';
import { LoginScreenNavigationProps } from '../types/types';
import AuthContext from '../contexts/AuthContext';


const LoginScreen = ({ navigation }: LoginScreenNavigationProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = React.useContext(AuthContext);

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
            textContentType={'password'}
            placeholder={t('password')}
            placeholderTextColor={theme.colorPlaceholderText}
          />

          <TouchableOpacity
            style={dynamicStyles.loginButton}
            onPress={() => login({ email, password })}
          >
            <Text style={dynamicStyles.loginButtonText}>{t('login').toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={dynamicStyles.registerButton}
            onPress={() => navigation.navigate('Register')}
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
    // height: 40,
    width: '100%',
    margin: 12,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: theme.colorOnBackground,
    alignItems: 'center',
    fontSize: 20,
    color: theme.colorOnBackground,
  },
  loginButton: {
    width: '100%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: theme.colorPrimaryButton,
  },
  loginButtonText: {
    color: theme.colorOnPrimaryButton,
  },
  registerButton: {
    width: '100%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: theme.colorSecondaryButton,
  },
  registerButtonText: {
    color: theme.colorOnSecondaryButton,
  },
});

export default LoginScreen;
