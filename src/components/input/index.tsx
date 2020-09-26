import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';


 const Input = ({value, placeholder, onChange}: any) => {
  return (
      <TextInput value={value} placeholder={placeholder} onChange={onChange} />
  );
}

const styles = StyleSheet.create({

});

export default Input
