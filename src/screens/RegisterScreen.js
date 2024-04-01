import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { register, login } from '../api/auth';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })

  const validatePasswords = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return 'Passwords do not match!';
    }
    return '';
  }

  const onChangeTextConfirmPassword = (text) => {
    setConfirmPassword({ value: text, error: validatePasswords(password.value, text) });
  }

  const onSignUpPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = validatePasswords(password.value, confirmPassword.value);
    passwordError = passwordValidator(password.value, confirmPassword.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setConfirmPassword({ ...password, error: passwordError })
      return
    }
    register(email.value, password.value).then((_) => {
      login(email.value, password.value).then((_) => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
      })
    }).catch((err) => {
      console.log(err);
      setEmail({ ...email, error: err.message })
    });
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={confirmPassword.value}
        onChangeText={onChangeTextConfirmPassword}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
