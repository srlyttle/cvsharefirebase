import * as React from "react";
import { View, Text, SafeAreaView, Pressable } from "react-native";

import { SignInUpValues } from "../types";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LoginForm from "../components/LoginForm";

const AuthScreen = () => {
  const [isRegisterFormActives, setisRegisterFormActives] =
    React.useState(false);
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const [authError, setAuthError] = React.useState<any>(null);
  const toggleRegisterLogin = () => {
    setisRegisterFormActives((state) => !state);
  };
  const createUserProfile = async (
    registerResponse: FirebaseAuthTypes.UserCredential,
    name: string
  ) => {
    try {
      const data = await db()
        .ref(`/users/${registerResponse.user.uid}`)
        .set({ name });

      nav.replace("Main");
    } catch (error) {
      // console.log("error", (error as any[])[1]);
    }
  };

  const signExistingUserIn = async ({ email, password }: SignInUpValues) => {
    setAuthError(null);
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);

      if (response.user) {
        nav.replace("Main");
      }
    } catch (error: any) {
      console.log("error", error.code);

      setAuthError(mapAuthCodeToMessage(error?.code));
    }
  };
  const registerAndGoToMainFlow = async (formData: SignInUpValues) => {
    setAuthError(null);
    const { email, password } = formData;
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      if (response.user && formData.name) {
        createUserProfile(response, formData.name);
      }
    } catch (error: any) {
      // console.log("error 1", error);
      console.log("error", error.code);

      setAuthError(mapAuthCodeToMessage(error?.code));
    }
  };
  function mapAuthCodeToMessage(authCode: any) {
    switch (authCode) {
      case "auth/invalid-password":
        return "Password provided is not corrected";
      case "auth/user-not-found":
        return "There is no user record corresponding to this identifier. The user may have been deleted.";

      case "auth/weak-password":
        return "Password provided is not strong enough";

      case "auth/email-already-in-use":
        return "Email provided is in use";

      // Many more authCode mapping here...

      default:
        return "";
    }
  }
  return (
    <SafeAreaView className="flex flex-1 rounded-md">
      <View className="mx-4">
        <View className="pt-4">
          <Text className="text-lg font-semibold">
            {isRegisterFormActives ? "New account sign up " : "Welcome back !"}
          </Text>
          <Text className="font-extralight  pb-4">
            Please enter your details
          </Text>
        </View>
        {
          <LoginForm
            onSubmit={
              isRegisterFormActives
                ? registerAndGoToMainFlow
                : signExistingUserIn
            }
            isRegister={isRegisterFormActives}
          />
        }
        <Pressable onPress={toggleRegisterLogin}>
          <View className="flex flex-row-reverse mt-2">
            <Text>{isRegisterFormActives ? "Login " : "Register "}</Text>
            <Text className="text-gray-500">
              {isRegisterFormActives
                ? "Already registered "
                : "Need an account ? "}
            </Text>
          </View>
        </Pressable>
        <View className="mt-4">
          <Text className="text-red-500 font-semibold">{authError}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
