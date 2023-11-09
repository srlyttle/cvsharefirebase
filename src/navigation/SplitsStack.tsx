import React, { useEffect } from "react";

import SettingsScreen from "../screens/SettingsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { requestPermissions } from "expo-sample-pedometer";
import Dashboard from "../screens/DashboardScreen";
import SplitsScreen from "../screens/SplitsScreen";
import SplitsDashboardScreen from "../screens/SplitsDashboardScreen";

export type StackParamList = {
  Dashboard: undefined;
  SplitsDetail: undefined;
  //   Login: undefined;
  //   Modal: undefined;
  Workouts: { splitName: string };
  //   Contacts: Partial<any> | undefined;
  //   Profile: undefined;
};
const Stack = createNativeStackNavigator<StackParamList>();

const SplitsStack = () => {
  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          // backgroundColor: "purple",
        },
        headerTitleStyle: {
          color: "white",
        },
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={SplitsDashboardScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="SplitsDetail"
        component={SplitsScreen}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default SplitsStack;
