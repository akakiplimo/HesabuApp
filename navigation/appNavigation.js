import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTrip from '../screens/AddTrip';
import AddExpense from '../screens/AddExpense';
import TripExpenses from '../screens/TripExpenses';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          options={{headerShown: false, presentation: 'modal'}}
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen
          options={{headerShown: false, presentation: 'modal'}}
          name="SignIn"
          component={SignInScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Welcome"
          component={WelcomeScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AddTrip"
          component={AddTrip}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AddExpense"
          component={AddExpense}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="TripExpenses"
          component={TripExpenses}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
