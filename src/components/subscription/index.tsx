import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from 'constants/Colors';
import { shadows } from 'constants/Layout';

interface SubscriptionProps {
  sub: Sub;
  deleteSub: () => void;
  editSub: () => void;
}

const Subscription = ({ sub, deleteSub, editSub }: SubscriptionProps) => {
  return (
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => editSub()}
      onLongPress={() => deleteSub()}>
      <View style={styles.container}>
        <Text style={styles.text}>{sub.name} will take </Text>
        <Text style={styles.text}>£{sub.price} </Text>
        <Text style={styles.text}>On the {sub.date}th of the month</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '85%',
  },
  container: {
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: Colors.brand,
    backgroundColor: Colors.brand,
    flexDirection: 'row',
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    ...shadows,
  },
  text: {
    color: Colors.text,
  },
});

export default Subscription;
