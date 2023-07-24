import * as React from "react";
import { Text, View, FlatList, Pressable } from "react-native";

import SetRow from "../SetRow";
import { ExerciseSet } from "../../types";

interface Props {
  exerciseName: string;
  exerciseSets: ExerciseSet[];
  onPress: (exerciseName: string, exerciseCategory: string) => void;
}

const ExerciseSummary = ({ exerciseName, exerciseSets, onPress }: Props) => {
  return (
    <View className="m-4  block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <View className={`flex flex-row border-b-[1px] border-sky-300`}>
        <Text className="text-gray-700 text-lg font-semibold pb-2">
          {exerciseName}
        </Text>
      </View>

      <View className="flex">
        <FlatList
          data={exerciseSets}
          renderItem={({ item }) => (
            <Pressable onPress={() => onPress(exerciseName, exerciseName)}>
              {item && <SetRow exerciseSet={item} />}
            </Pressable>
          )}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          keyExtractor={(item, index) => `${"setitem"}${index}`}
        />
      </View>
    </View>
  );
};

export default ExerciseSummary;
