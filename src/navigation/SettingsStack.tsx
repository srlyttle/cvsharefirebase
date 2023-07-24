import React, { useEffect } from "react";

import SettingsScreen from "../screens/SettingsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { requestPermissions } from "expo-sample-pedometer";
import Dashboard from "../screens/DashboardScreen";

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "purple",
        },
        headerTitleStyle: {
          color: "white",
        },
      }}
    >
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
