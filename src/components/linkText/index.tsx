import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';
import Colors from 'constants/Colors';

interface LinkTextProps {
  children: string;
  onPress: () => void;
}

const LinkText = ({ children, onPress }: LinkTextProps) => {
  return (
    <TouchableHighlight style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  text: {
    color: Colors.text,
  },
});

export default LinkText;
