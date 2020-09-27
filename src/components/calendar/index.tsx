import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from 'constants/Colors';

interface CalendarProps {
  onPress: (d: number) => void;
  selected: number;
}

const Calendar = ({ onPress, selected }: CalendarProps) => {
  const days = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ];

  return (
    <View style={styles.container}>
      {days.map((day: number) => (
        <TouchableOpacity
          style={[
            styles.date,
            {
              backgroundColor: selected === day ? Colors.brand : 'transparent',
            },
          ]}
          onPress={() => onPress(day)}>
          <Text style={styles.text}>{day}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  date: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 23,
  },
  text: {
    textAlign: 'center',
    color: Colors.text,
  },
});

export default Calendar;
