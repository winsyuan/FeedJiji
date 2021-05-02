import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import GroupScreen from "./screens/GroupScreen";
import GroupInfoScreen from "./screens/GroupInfoScreen";
import CreateOrJoinGroupScreen from "./screens/CreateOrJoinGroupScreen";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
// config is in .gitignore all firebase credentials are hidden
import { firebaseConfig } from "./config";

export default class App extends Component {
  async initializeUser() {
    firebase.initializeApp(firebaseConfig);
    await firebase.auth().signInAnonymously();
    // console.log(firebase.auth().currentUser)
    console.log(await firebase.auth().currentUser.getIdToken)
  }
  render() {
    const Stack = createStackNavigator();
    this.initializeUser()
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="GroupScreen" component={GroupScreen} />
            <Stack.Screen
              name="CreateOrJoinGroupScreen"
              component={CreateOrJoinGroupScreen}
            />
            <Stack.Screen name="GroupInfoScreen" component={GroupInfoScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
