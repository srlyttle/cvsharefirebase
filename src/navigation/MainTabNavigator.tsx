import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsStack from "./SettingsStack";

const Tab = createBottomTabNavigator();

import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExerciseStackNavigator } from "./ExerciseStack";
import SplitsStack from "./SplitsStack";

const MainTabNavigator = () => {
  return (
    <SafeAreaView className="flex flex-1">
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Workouts") {
              iconName = "barbell-sharp" as const;
            } else if (route.name == "Analytics") {
              iconName = "analytics-sharp" as const;
            } else if (route.name == "Home") {
              iconName = "home-sharp" as const;
            } else {
              iconName = "settings-sharp" as const;
            }
            return (
              <Ionicons
                name={iconName}
                size={25}
                color={focused ? "black" : "grey"}
              />
            );
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Workouts"
          component={ExerciseStackNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Splits"
          component={SplitsStack}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStack}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
export default MainTabNavigator;
