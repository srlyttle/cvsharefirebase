import * as React from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import SetRow from "../SetRow";
import { ExerciseSet } from "../../types";

interface Props {
  splitName: string;
  workouts: string[];
  cycles: number;
  toDeload: number;
  lastWorkout: string;
  nextWorkout: string;
  workoutGoal: string;
  overloadAmount: number;
  onPress: (exerciseName: string, exerciseCategory: string) => void;
}

const SplitSummary = ({
  splitName,
  workouts,
  cycles,
  toDeload,
  lastWorkout,
  nextWorkout,
  workoutGoal,
  overloadAmount,
  onPress,
}: Props) => {
  return (
    <View className="m-4  block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <View className={`flex flex-row border-b-[1px] border-sky-300`}>
        <Text className="text-gray-700 text-lg font-semibold pb-2">
          {splitName}
        </Text>
      </View>
      <View>
        <Text className="text-gray-500 text-md font-semibold pb-2">
          {cycles} completed, {toDeload} to deload
        </Text>
      </View>
      <View>
        <Text className="text-gray-500 text-md font-semibold pb-2">
          {workoutGoal} {overloadAmount} %
        </Text>
      </View>
      <View className="flex">
        <FlatList
          data={workouts}
          renderItem={({ item }) => (
            <Pressable onPress={() => onPress(splitName, item)}>
              {/* {item && <SetRow exerciseSet={item} />}
               */}
              <View className="flex flex-row items-center">
                <Text> {item}</Text>
                {nextWorkout !== item ? (
                  <Ionicons name="checkmark" size={25} color="green" />
                ) : (
                  <Ionicons name="fitness" size={25} color="orange" />
                )}
                {/* <Ionicons name="checkmark" size={25} color="green" /> */}
              </View>
            </Pressable>
          )}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          keyExtractor={(item, index) => `${"setitem"}${index}`}
        />
        <View className="flex flex-row justify-around my-2">
          <Pressable
            onPress={() => {}}
            className="bg-green-600 p-2 flex-1 m-2 items-center justify-center rounded-md"
          >
            <Text className="text-white">Start Next</Text>
          </Pressable>
          {/* {!rowSelected && (
            <Pressable
              className="bg-sky-400 p-2 flex-1 m-2 items-center justify-center  rounded-md"
              onPress={handleClear}
            >
              <Text className="text-white">Clear</Text>
            </Pressable>
          )}
          {rowSelected && (
            <Pressable
              onPress={handleDeleteRow}
              className="bg-red-400 p-2 flex-1 m-2 items-center justify-center  rounded-md"
            >
              <Text className="text-white">Delete</Text>
            </Pressable>
          )} */}
        </View>
      </View>
    </View>
  );
};

export default SplitSummary;
