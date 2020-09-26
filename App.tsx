import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import useCachedResources from 'hooks/useCachedResources';
import "firebase/auth";
import SignUp from 'screens/signUp'

const Stack = createStackNavigator();


const  App = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
         <NavigationContainer>
        <Stack.Navigator

          initialRouteName={'Sign Up'}>
          <Stack.Screen
            options={{
              headerLeft: () => null,
            }}
            name="Sign Up"
            component={SignUp}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

export default App
