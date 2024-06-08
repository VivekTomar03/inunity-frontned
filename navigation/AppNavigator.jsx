import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';
import SignInScreen from '../screen/SignInScreen ';
import SignUpScreen from '../screen/SignUpScreen';
import HomeScreen from '../screen/HomeScreen.js';
import NotesScreen from '../screen/NotesScreen.jsx';
import ProfileScreen from '../screen/ProfileScreen.jsx';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{ headerShown: false }}  name="Home" component={HomeScreen} />
      <Tab.Screen options={{ headerShown: false }}  name="Notes" component={NotesScreen} />
      <Tab.Screen options={{ headerShown: false }}  name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Main">
        <Stack.Screen options={{headerTitle:"Inunity-Note-App"}} name="SignIn" component={SignInScreen} />
        <Stack.Screen options={{headerTitle:"Inunity-Note-App"}} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{headerTitle:"Inunity-Note-App"}} name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
