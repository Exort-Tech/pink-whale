import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';


 const Button = ({onPress, children}: any) => {
  return (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

});

export default Button
