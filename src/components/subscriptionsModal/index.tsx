import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as firebase from 'firebase';
import Button from 'components/button';
import Modal from 'react-native-modal';
import Input from 'components/input';
import Calendar from '../calendar';
import * as Notifications from 'expo-notifications';
import { FullScreenLoader } from '../loadingIndicator';
import Colors from 'constants/Colors';
import { modalShadows } from 'constants/Layout';

interface SubscriptionsModalProps {
  isVisible: boolean;
  dismiss: () => void;
  userId: string;
  subs: Subs;
  sub?: Sub | null;
}

const SubscriptionsModal = ({
  isVisible,
  dismiss,
  userId,
  subs,
  sub,
}: SubscriptionsModalProps) => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [date, setDate] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (sub) {
      setName(sub.name);
      setPrice(sub.price);
      setDate(sub.date);
    }
  }, [sub]);

  const update = (sevenDayId: string, twoDayId: string) => {
    firebase
      .firestore()
      .collection('subscriptions')
      .doc(userId)
      .update({
        [name]: {
          name,
          price,
          date,
          sevenDayId,
          twoDayId,
        },
      });
  };

  const create = (sevenDayId: string, twoDayId: string) => {
    firebase
      .firestore()
      .collection('subscriptions')
      .doc(userId)
      .set({
        [name]: {
          name,
          price,
          date,
          sevenDayId,
          twoDayId,
        },
      });
  };
  const addSevenDayReminder = async () => {
    const sevenDayNotificationId = await Notifications.scheduleNotificationAsync(
      {
        content: {
          title: '',
          body: `Your ${name} payment will be taken in 7 days`,
        },
        trigger: {
          day: date - 7,
          hour: 12,
          minute: 0,
          repeats: true,
        },
      },
    );
    return sevenDayNotificationId;
  };

  const addTwoDayReminder = async () => {
    const twoDayNotificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '',
        body: `Your ${name} payment will be taken in 2 days`,
      },
      trigger: {
        day: date - 2,
        hour: 12,
        minute: 10,
        repeats: true,
      },
    });
    return twoDayNotificationId;
  };
  const saveSubscription = async () => {
    setLoading(true);
    try {
      const sevenDayId = await addSevenDayReminder();
      const twoDayId = await addTwoDayReminder();

      subs && subs.length !== 0
        ? update(sevenDayId, twoDayId)
        : create(sevenDayId, twoDayId);
      setLoading(false);
      close();
    } catch (error) {
      console.log(error);
    }
  };

  const close = () => {
    setName('');
    setPrice('');
    setDate(0);
    dismiss();
  };

  return (
    <Modal backdropOpacity={0.7} isVisible={isVisible} onBackdropPress={close}>
      <View style={styles.container}>
        <Input
          value={name}
          placeholder="name of subscription"
          onChange={(e) => setName(e.nativeEvent.text)}
        />
        <Input
          value={price}
          placeholder="price of subscription"
          onChange={(e) => setPrice(e.nativeEvent.text)}
        />
        <Text style={styles.text}>
          Please select the date your payment is taken
        </Text>
        <Calendar selected={date} onPress={(d: number) => setDate(d)} />
        <Button
          disabled={date === 0 || name.length === 0 || price.length === 0}
          onPress={() => saveSubscription()}>
          {sub ? 'Update Subscription' : 'Add Subscription'}
        </Button>
        <FullScreenLoader visible={loading} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 600,
    borderRadius: 30,
    ...modalShadows,
  },
  text: {
    color: Colors.text,
    marginBottom: 20,
    fontSize: 16,
  },
});

export default SubscriptionsModal;
