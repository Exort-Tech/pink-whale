import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import * as firebase from 'firebase';
import Button from 'components/button';
import SubsciptionsModal from 'components/subscriptionsModal';
import * as Permissions from 'expo-permissions';
import * as _ from 'lodash';
import Subscription from 'components/subscription';
import * as Notifications from 'expo-notifications';
import { FullScreenLoader } from 'components/loadingIndicator';
import ErrorMessage from 'components/errorMessage';

const Subscriptions = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [subs, setSubs] = useState<firebase.firestore.DocumentData | undefined>(
    undefined,
  );
  const [sub, setSub] = useState<Sub | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [deleteError, setDeleteError] = useState<Error | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  useEffect(() => {
    setUser(firebase.auth().currentUser);
  }, [firebase.auth().currentUser]);
  useEffect(() => {
    const getPremissions = async () => {
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
    };
    getPremissions();
  }, []);
  useEffect(() => {
    if (user) {
      try {
        const subscriber = firebase
          .firestore()
          .collection('subscriptions')
          .doc(user.uid)
          .onSnapshot((dSnapshot) => {
            if (!dSnapshot?.data()) {
              return setSubs([]);
            }
            setSubs(dSnapshot.data());
          });
        return () => subscriber();
      } catch (error) {
        setError(error);
      }
    }
  }, [user]);

  const handleUpdateSub = (sub: Sub) => {
    setSub(sub);
    setModalVisible(true);
  };
  const handleDeleteSub = async (sub: Sub) => {
    try {
      await Notifications.cancelScheduledNotificationAsync(sub.twoDayId);
      await Notifications.cancelScheduledNotificationAsync(sub.sevenDayId);
      firebase
        .firestore()
        .collection('subscriptions')
        .doc(user?.uid)
        .update({
          [sub.name]: firebase.firestore.FieldValue.delete(),
        });
    } catch (error) {
      setDeleteError(error);
    }
  };
  const showDeleteAlert = (sub: Sub) => {
    Alert.alert('Delete Subscription?', 'This cannot be undone!', [
      {
        text: 'cancel',
        onPress: () => null,
      },
      {
        text: 'delete',
        onPress: () => handleDeleteSub(sub),
        style: 'destructive',
      },
    ]);
  };

  if (!user || !subs) {
    return <FullScreenLoader visible />;
  }
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          {error ? (
            <ErrorMessage>
              We were unable to load your data, please try again!
            </ErrorMessage>
          ) : null}
          {subs?.length !== 0 &&
            _.map(subs, (sub: Sub) => {
              return (
                <Subscription
                  deleteSub={() => showDeleteAlert(sub)}
                  editSub={() => handleUpdateSub(sub)}
                  sub={sub}
                />
              );
            })}

          <SubsciptionsModal
            sub={sub}
            subs={subs}
            userId={user.uid}
            isVisible={modalVisible}
            dismiss={() => {
              setSub(null);
              setModalVisible(false);
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.fixed}>
        {deleteError ? (
          <ErrorMessage>
            Sorry we couldn't delete that subscription try agian
          </ErrorMessage>
        ) : null}
        <Button style={styles.button} onPress={() => setModalVisible(true)}>
          Add new subscription
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 100,
  },
  button: {
    height: 50,
  },
  fixed: {
    position: 'absolute',
    bottom: 35,
    width: '100%',
    alignItems: 'center',
  },
});

export default Subscriptions;
