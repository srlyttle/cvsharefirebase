import React from "react";
import { View, Text, Pressable } from "react-native";

interface Props {
  id: string;
  content: string;
  onPress: (id: string) => void;
  subContent?: string;
  isSelected?: boolean;
}

const Row = ({ id, content, subContent, onPress, isSelected }: Props) => {
  return (
    <Pressable onPress={() => onPress(id)}>
      <View
        className={`flex flex-row pt-2 pxs-4 ${
          isSelected ? "bg-slate-400" : ""
        }`}
      >
        <View className="flex flex-row">
          <View className="flex pr-4">
            <Text className="text-gray-700 text-lg font-semibold pr-2">
              {content}
            </Text>
            {subContent && (
              <Text className="text-gray-700 text-xs font-light">
                {subContent}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Row;
