import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {onAuthStateChanged} from 'firebase/auth';
import {setUser} from '../redux/slices/user';
import {auth} from '../config/firebase';
import HomeScreen from '../screens/HomeScreen';
import AddTrip from '../screens/AddTrip';
import AddExpense from '../screens/AddExpense';
import TripExpenses from '../screens/TripExpenses';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const {user} = useSelector(state => state.user);

  const dispatch = useDispatch();

  onAuthStateChanged(auth, userAuth => {
    console.log('User', userAuth);
    dispatch(setUser(userAuth));
  });

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
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
  } else {
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNavigation;
