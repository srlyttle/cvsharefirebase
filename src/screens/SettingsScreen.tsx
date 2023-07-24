import React from "react";
import { View, Button } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import auth from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";

const SettingsScreen = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const { currentUser } = auth();

  const handleLogout = () => {
    auth().signOut();
    nav.push("AuthScreen");
  };

  const handleDeleteAccount = async () => {
    await db().ref(`/users/${currentUser?.uid}`).remove();

    await auth().currentUser?.delete();
    nav.push("AuthScreen");
  };

  return (
    <View className="flex h-full flex-col-reverse">
      <Button title="Delete" onPress={handleDeleteAccount} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default SettingsScreen;
