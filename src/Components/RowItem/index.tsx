import React from "react";
import { View, Text, Pressable } from "react-native";

interface Props {
  id: string;
  order: number;
  onPress: (id: string, reps: string, weight: string) => void;

  isSelected?: boolean;
  reps: string;
  weight: string;
  weightUnit?: string;
}

const RowItem = ({
  id,
  weight,
  reps,
  weightUnit,

  onPress,
  isSelected,
  order,
}: Props) => {
  return (
    <Pressable onPress={() => onPress(id, reps, weight)}>
      <View
        className={`flex flex-row pt-2 mx-4 items-center ${
          isSelected ? "bg-slate-200" : ""
        }`}
      >
        <View className="w-4" />
        <Text className="text-gray-700 text-lg font-semibold pr-2 flex-1">
          {order + 1}
        </Text>
        <View className="flex flex-row items-center flex-1">
          <Text className="text-gray-700 text-lg font-semibold pr-2">
            {weight}
          </Text>
          <Text className="text-gray-700 text-xs font-light">{weightUnit}</Text>
        </View>
        <View className="flex flex-row items-center flex-1">
          <Text className="text-gray-700 text-lg font-semibold pr-2">
            {reps}
          </Text>
          <Text className="text-gray-700 text-xs font-light">reps</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RowItem;
