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
import AppLoading from "expo-app-loading";

export default class App extends Component {
  state = {
    isReady: false,
  };

  async initializeUser() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      await firebase.auth().signInAnonymously();
    } else {
      firebase.app();
    }
    console.log("initialized firebase");
  }

  render() {
    const Stack = createStackNavigator();
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.initializeUser}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
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
