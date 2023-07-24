import React from "react";
import { View, TextInput, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { SignInUpValues } from "../../types";
import CustomPressable from "../CustomPressable";

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  isRegister: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isRegister }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUpValues>();

  const onFormSubmit = (formData: SignInUpValues) => {
    onSubmit(formData);
  };

  const registerValidationRules = isRegister
    ? {
        required: { value: true, message: "required" },
        minLength: { value: 3, message: "too short" },
      }
    : undefined;
  const inputClassname =
    "rounded-md p-4 mb-4 bg-white text-gray-700 border-gray-200 border-2";
  return (
    <View className="flex">
      {isRegister && (
        <Controller
          control={control}
          rules={registerValidationRules}
          render={({ field }) => (
            <TextInput
              className={`${inputClassname}`}
              placeholder="Enter your name"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
          name="name"
          defaultValue=""
        />
      )}

      <Controller
        control={control}
        rules={{
          required: { value: true, message: "required" },
          pattern: {
            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            message: "Invalid email format",
          },
        }}
        render={({ field }) => (
          <TextInput
            className={inputClassname}
            placeholder="Enter your email"
            value={field.value}
            onChangeText={field.onChange}
            autoCapitalize="none"
          />
        )}
        name="email"
        defaultValue=""
      />

      <Controller
        control={control}
        rules={{ required: "Password is required" }}
        render={({ field }) => (
          <TextInput
            className={inputClassname}
            placeholder="Enter your password"
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
            autoCapitalize={"none"}
          />
        )}
        name="password"
        defaultValue=""
      />

      <CustomPressable
        accessibilityLabel={isRegister ? "Register" : "Login"}
        onPress={handleSubmit(onFormSubmit)}
        // apply style as way to hook into pressed
        style={({ pressed }) => [
          {
            padding: 10,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: pressed ? "#7dd3fc" : "#0ea5e9",
          },
        ]}
      >
        <Text className="text-white font-semibold">
          {isRegister ? "Register" : "Login"}
        </Text>
      </CustomPressable>
      {errors.name && (
        <View className="p-2">
          <Text className="text-red-500">Name is {errors.name.message}</Text>
        </View>
      )}
      {errors.email && (
        <View className="p-2">
          <Text className="text-red-500">Email is {errors.email.message}</Text>
        </View>
      )}
    </View>
  );
};

export default LoginForm;
