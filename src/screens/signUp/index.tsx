import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Input from 'components/input'
import Button from 'components/button'

 const SignUp = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
  return (
    <View style={styles.container}>
      <Input value={email} placeholder='email' onChange={(e) => setEmail(e.nativeEvent.text)} />
      <Input value={password} placeholder='password' onChange={(e) => setPassword(e.nativeEvent.text)} />
      <Button>Sign Up</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default SignUp
