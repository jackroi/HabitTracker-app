import React, { useState } from 'react';
import {
  Button,
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

import { LoginScreenNavigationProps } from '../types/types';


const LoginScreen = ({ navigation }: LoginScreenNavigationProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            autoCompleteType={'email'}
            autoCorrect={false}
            textContentType={'emailAddress'}
            placeholder={'Email'}
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            textContentType={'password'}
            placeholder={'Password'}
          />

          <TouchableOpacity style={styles.loginButton}>
            <Text>{t('login').toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text>{t('register')}</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    // height: 40,
    width: '100%',
    margin: 12,
    paddingVertical:10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: 'center',
    fontSize: 20,
  },
  loginButton: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#ffc014",
  },
  registerButton: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#e2e2e2",
  },
});

export default LoginScreen;
