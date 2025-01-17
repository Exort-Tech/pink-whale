import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Input from 'components/input';
import Button from 'components/button';
import LinkText from 'components/linkText';
import * as firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';
import { FullScreenLoader } from 'components/loadingIndicator';
import ErrorMessage from 'components/errorMessage';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const nav = useNavigation();
  const handleSignUp = () => {
    setLoading(true);

    const signUp = async () => {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        nav.navigate('Home');
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    };
    signUp();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.inputs}>
          <Input
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.nativeEvent.text)}
          />
          <Input
            secureTextEntry
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
        </View>
        {error ? (
          <ErrorMessage>Looks Like Something went wrong!</ErrorMessage>
        ) : null}
        <View style={styles.buttons}>
          <Button onPress={handleSignUp}>Sign Up</Button>
          <LinkText onPress={() => nav.navigate('Login')}>
            Already A memeber? Login!
          </LinkText>
        </View>
        <FullScreenLoader visible={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    flex: 3,
    justifyContent: 'center',
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#353135',
    width: '90%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowRadius: 3,
    shadowOpacity: 0.5,
    borderRadius: 25,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
});

export default SignUp;
