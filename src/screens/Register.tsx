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


const LoginScreen = ({ navigation }: RegisterScreenNavigationProps) => {
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
            value={email}
            onChangeText={setEmail}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            autoCompleteType={'email'}
            autoCorrect={false}
            textContentType={'emailAddress'}
            placeholder={t('email')}
          />
          <TextInput
            style={dynamicStyles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            textContentType={'newPassword'}
            placeholder={t('password')}
          />
          <TextInput
            style={dynamicStyles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            textContentType={'newPassword'}
            placeholder={t('confirmPassword')}
          />

          <TouchableOpacity
            style={dynamicStyles.registerButton}
            onPress={() => register({ email, password })}
          >
            <Text>{t('register')}</Text>
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
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#ffc014",
  },
});

export default LoginScreen;
