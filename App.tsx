import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from 'screens/signUp';
import Subscriptions from 'screens/subscriptions';
import LogIn from 'screens/longin';
import * as firebase from 'firebase';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import 'firebase/auth';
import 'firebase/firestore';
import { FullScreenLoader } from 'components/loadingIndicator';
import Colors from 'constants/Colors';
const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: 'AIzaSyBgOoYuSle4mtIfN-y61fogW7sbImRTYQ0',
  authDomain: 'pink-whale-b3e3c.firebaseapp.com',
  databaseURL: 'https://pink-whale-b3e3c.firebaseio.com',
  projectId: 'pink-whale-b3e3c',
  storageBucket: 'pink-whale-b3e3c.appspot.com',
  messagingSenderId: '992567108785',
  appId: '1:992567108785:web:d2a56ee96724a09b26ae90',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const intitialRoute = user ? 'Home' : 'Login';
  const onAuthStateChanged = useCallback(
    (newUser) => {
      setUser(newUser);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  if (initializing) {
    return <FullScreenLoader visible />;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              cardStyle: {
                backgroundColor: Colors.background,
              },
              headerStyle: {
                backgroundColor: Colors.background,
                borderBottomColor: Colors.background,
                shadowOffset: { width: 0, height: 0 },
              },
              headerTitleStyle: {
                color: Colors.text,
              },
            }}
            initialRouteName={intitialRoute}>
            <Stack.Screen
              options={{
                headerLeft: () => null,
              }}
              name="Sign Up"
              component={SignUp}
            />
            <Stack.Screen
              options={{
                headerLeft: () => null,
              }}
              name="Login"
              component={LogIn}
            />
            <Stack.Screen
              options={{
                headerLeft: () => null,
              }}
              name="Home"
              component={Subscriptions}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
};

export default App;
