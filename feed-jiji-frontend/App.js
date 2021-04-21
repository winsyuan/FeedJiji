import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import GroupScreen from "./screens/GroupScreen";
import GroupInfoScreen from "./screens/GroupInfoScreen";
import CreateOrJoinGroupScreen from "./screens/CreateOrJoinGroupScreen";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const Stack = createStackNavigator();
  return (
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
  );
}
