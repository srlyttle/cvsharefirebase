import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// import { User } from "./components/ChatListItem";

import { Ionicons, Entypo } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Dashboard from "../screens/DashboardScreen";
import AllExercises from "../screens/AllExercisesScreen";
import Exercise from "../screens/ExerciseScreen";

export type RootStackParamList = {
  Dashboard: undefined;
  AllExercises: undefined;
  //   Login: undefined;
  //   Modal: undefined;
  Exercise: { exerciseName: string; exerciseCategory: string };
  //   Contacts: Partial<any> | undefined;
  //   Profile: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
export const ExerciseStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <>
        <Stack.Group>
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />

          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          <Stack.Screen
            name="AllExercises"
            component={AllExercises}
            options={({ navigation }) => ({
              headerShown: true,
            })}
          />
          <Stack.Screen
            name="Exercise"
            component={Exercise}
            options={({ navigation }) => ({
              headerShown: true,
            })}
          />
          {/* <Stack.Screen
              name="Contacts"
              component={ContactsScreen}
              options={({ navigation }) => ({
                headerShown: true,
              })}
            /> */}
          {/* <Stack.Screen name="Chat" component={ChatScreen} /> */}
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          {/* <Stack.Screen name="Modal" component={ModalScreen} /> */}
        </Stack.Group>
      </>
    </Stack.Navigator>
  );
};
