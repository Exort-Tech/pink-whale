import * as React from 'react';
import {
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import Colors from 'constants/Colors';

interface InputProps {
  value: string;
  placeholder: string;
  onChange: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  secureTextEntry?: boolean;
}

const Input = ({
  value,
  placeholder,
  onChange,
  secureTextEntry,
}: InputProps) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={Colors.text}
      onChange={onChange}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: Colors.brand,
    borderStyle: 'solid',
    height: 50,
    minWidth: '80%',
    maxWidth: '80%',
    color: Colors.text,
    paddingLeft: 15,
    marginBottom: 20,
  },
});

export default Input;
