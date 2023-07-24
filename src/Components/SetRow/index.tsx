import React from "react";
import { View, Text } from "react-native";
import { ExerciseSet } from "../../types";

interface Props {
  exerciseSet: ExerciseSet;
}

const SetRow = ({ exerciseSet }: Props) => {
  const { isPersonalBest, weight, weightUnit, reps } = exerciseSet;
  return (
    <View className="flex flex-row pt-2 pr-4">
      <View className="flex flex-row flex-1" />
      <View className="flex flex-row">
        <View className="flex flex-row items-center pr-4">
          <Text className="text-gray-700 text-lg font-semibold pr-2">
            {weight}
          </Text>
          <Text className="text-gray-700 text-sm font-light">{weightUnit}</Text>
        </View>
        <View className="flex flex-row items-center">
          <Text className="text-gray-700 text-lg font-semibold pr-2">
            {reps}
          </Text>
          <Text className="text-gray-700 text-sm font-light">reps</Text>
        </View>
      </View>
    </View>
  );
};

export default SetRow;
