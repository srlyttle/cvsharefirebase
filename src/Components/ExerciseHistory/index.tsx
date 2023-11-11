import * as React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import auth from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";

import { useAppContext } from "../../context/useAppContext";

interface Props {
  exerciseName: string;
  exerciseCategory: string;
}

type DaySummary = Record<string, Exercise[]>;
interface Exercise {
  id: string;
  isPersonalBest: false;
  order?: number;
  reps?: number;
  weight?: number;
  weightUnit: "kgs";
}

export type Day = Record<string, Record<string, Partial<Exercise>[]>>;
export const ExerciseHistory = ({ exerciseName, exerciseCategory }: Props) => {
  const { currentUser } = auth();
  const { setCurrentDate } = useAppContext();
  const [summary, setSummary] = React.useState<Day>({});
  const [formattedHistory, setFormattedHistory] = React.useState<any>({});
  const layout = useWindowDimensions();

  React.useEffect(() => {
    const onValueChange = db()
      .ref(`/users/${currentUser?.uid}/workouts`)
      .on("value", (snapshot) => {
        setSummary(snapshot.val());
      });

    // Stop listening for updates when no longer required
    return () =>
      db()
        .ref(`/users/${currentUser?.uid}/workouts`)
        .off("value", onValueChange);
  }, [currentUser, setCurrentDate]);

  React.useEffect(() => {
    const newFormattedHistory = Object.keys(summary).reduce<any>(
      (acc, date) => {
        if (!summary?.[date]?.[exerciseName]) {
          return acc;
        }

        const exerciseData = summary[date][exerciseName];
        const guids = Object.keys(exerciseData);

        const sets = guids.map(
          (guid) => exerciseData[guid as keyof typeof exerciseData]
        );

        acc[date] = sets;

        return acc;
      },
      {}
    );

    setFormattedHistory(newFormattedHistory);
  }, [summary, exerciseName]);

  const allExerciseDates = Object.keys(formattedHistory);
  return (
    <View className="flex bg-slate-50 flex-1 w-full rounded-lg pb-4 h-24">
      {Object.keys(formattedHistory).map((exerciseDate) => (
        <>
          <View className="flex mx-4 pt-2 border-b-2 border-sky-400">
            <Text className="text-lg font-semibold text-gray-600">
              {exerciseDate}{" "}
            </Text>
          </View>
          {formattedHistory[exerciseDate].map(
            (set: {
              order: number;
              reps: string;
              weight: string;
              weightUnit: string;
            }) => (
              <View className="flex flex-row-reverse ml-4 items-center ">
                <View>
                  <Text className="font-light">reps </Text>
                </View>
                <View>
                  <Text className="text-lg">{set.reps} </Text>
                </View>
                <View>
                  <Text className="font-light">{set.weightUnit} </Text>
                </View>
                <View>
                  <Text className="text-lg">{set.weight} </Text>
                </View>
              </View>
            )
          )}
        </>
      ))}
    </View>
  );
};
