import React from "react";

import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./src/screens/AuthScreen";
import { LoadingScreen } from "./src/screens/LoadingScreen";

import MainTabNavigator from "./src/navigation/MainTabNavigator";
import { AppContextProvider } from "./src/context/AppContextProvider";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoadingScreen"
            component={LoadingScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AuthScreen"
            component={AuthScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </AppContextProvider>
  );
}
