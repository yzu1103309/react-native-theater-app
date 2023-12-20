import React, {useState} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Alert,
} from 'react-native';
import {Button} from 'react-native-ios-kit';
import {colors, shadow, sizes, spacing} from '../constants/theme';
import {client} from '../apis/common';
import {HTTPError} from 'ky';
import {useSWRConfig} from 'swr';

const LoginScreen = () => {
  const {mutate} = useSWRConfig();
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  async function login(user_name, password) {
    if(user_name === '')
    {
      Alert.alert('帳號不能為空');
    }
    else if(password === '')
    {
      Alert.alert('密碼不能為空');
    }
    else
    {
      await client
        .post('auth/signin', {
          json: {
            user_name,
            password,
          },
        })
        .catch(e => {
          if (e instanceof HTTPError && e.response.status === 403) {
            Alert.alert('帳號或密碼錯誤！');
          } else {
            Alert.alert('發生錯誤，請稍後再試');
          }
        });
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View>
            <Text style={styles.title}>Welcome!</Text>
            <TextInput
              style={styles.input}
              placeholder={'username'}
              onChangeText={setUserName}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder={'password'}
              onChangeText={setPassword}
            />
            <Button
              rounded
              inverted
              style={styles.btn}
              onPress={() =>
                login(user_name, password).then(() =>
                  mutate(['auth/status', {throwHttpErrors: true}]),
                )
              }>
              Login
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.l,
  },
  title: {
    fontSize: sizes.title,
    marginBottom: spacing.m,
  },
  input: {
    backgroundColor: colors.white,
    paddingLeft: spacing.m,
    paddingRight: spacing.m,
    paddingVertical: spacing.s,
    marginBottom: spacing.s,
    borderRadius: sizes.radius,
    height: 54,
    ...shadow.light,
  },
  btn: {
    marginTop: spacing.m,
    borderRadius: sizes.radius,
  },
});

export default LoginScreen;
