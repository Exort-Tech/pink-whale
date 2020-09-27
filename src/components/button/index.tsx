import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from 'constants/Colors';
import { shadows } from 'constants/Layout';

interface ButtonProps {
  onPress: () => void;
  children: string;
  disabled?: boolean;
  style?: { [key: string]: string | number };
}

const Button = ({ onPress, children, disabled, style }: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, style]}
      onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 35,
    borderWidth: 1,
    borderColor: Colors.brand,
    backgroundColor: Colors.brand,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows,
  },
  text: {
    color: Colors.text,
  },
});

export default Button;
