import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ErrorMessageProps {
  children: string;
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'red',
    marginVertical: 20,
  },
});

export default ErrorMessage;
