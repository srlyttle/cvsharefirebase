import * as React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// import { RootStackParamList } from "../navigation/ExerciseStack";

import uuid from "react-native-uuid";
// import RowItem from "../components/RowItem";
import auth from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";

import Toast from "react-native-toast-message";

import { TabView, SceneMap } from "react-native-tab-view";

import RowItem from "../RowItem";
import { useAppContext } from "../../context/useAppContext";
import { parseDbDataToExercises } from "../../utils/parseDbDataToExercises";
import { ExerciseSet } from "../../types";

interface Props {
  exerciseName: string;
  exerciseCategory: string;
  currentIndex: number;
  dayExerciseCount: number;
}
export const ExerciseTrack = ({
  exerciseName,
  exerciseCategory,
  currentIndex,
  dayExerciseCount,
}: Props) => {
  const { currentUser } = auth();
  const { setCurrentDate, currentDate, setDayExerciseData, dayExerciseData } =
    useAppContext();

  //   const { exerciseName, exerciseCategory } = route.params;
  const [dayExercises, setDayExercises] = React.useState({});
  const [weightValue, setWeightValue] = React.useState("");
  const [repValue, setRepValue] = React.useState("");
  const [category, setCategory] = React.useState<string | null>(null);

  const [rowSelected, setRowSelected] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = React.useState<null | string>(null);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);
  const layout = useWindowDimensions();

  React.useEffect(() => {
    const onValueChange = db()
      .ref(`/users/${currentUser?.uid}/workouts/${currentDate}`)
      .on("value", (snapshot) => {
        setDayExercises(parseDbDataToExercises(snapshot.val()));
      });

    // Stop listening for updates when no longer required
    return () =>
      db()
        .ref(`/users/${currentUser?.uid}/workouts/${currentDate}`)
        .off("value", onValueChange);
  }, [currentUser, currentDate]);
  const newdata =
    dayExercises && dayExercises[exerciseName as keyof typeof dayExercises];

  const handleDeleteRow = async () => {
    if (selectedRowId && rowSelected) {
      await db()
        .ref(
          `/users/${currentUser?.uid}/workouts/${currentDate}/${exerciseName}`
        )
        .update({
          [selectedRowId]: null,
        });
      setRowSelected(false);
      setSelectedRowId(null);
    }
  };

  const handleSelectRow = (id: string, reps: string, weight: string) => {
    setRowSelected((state) => (id === selectedRowId ? !state : true));
    setSelectedRowId((state) => (id === state ? null : id));
    setRepValue(reps);
    setWeightValue(weight);
  };

  const handleClear = () => {
    setWeightValue("");
    setRepValue("");
  };

  const handleWeightStep = (stepType: "up" | "down") => {
    const incrementStepAmont = 2.5;

    stepType === "up"
      ? setWeightValue((state) => (+state + incrementStepAmont).toString())
      : setWeightValue((state) =>
          (+state > incrementStepAmont
            ? +state - incrementStepAmont
            : state
          ).toString()
        );
  };

  const handleRepStep = (stepType: "up" | "down") => {
    const incrementStepAmont = 1;

    stepType === "up"
      ? setRepValue((state) => (+state + incrementStepAmont).toString())
      : setRepValue((state) =>
          (+state > incrementStepAmont
            ? +state - incrementStepAmont
            : state
          ).toString()
        );
  };

  const handleSaveOrUpdateRow = async (data: any) => {
    if (!weightValue || !repValue) {
      Toast.show({
        type: "error",
        text1: "Please enter a value for weight and reps",
      });
      return;
    }

    const setItem = (
      dayExercises?.[exerciseName as keyof typeof dayExercises] as ExerciseSet[]
    )?.find((set) => set?.id === selectedRowId);

    const setOrder = setItem ? setItem?.order : (newdata as any[])?.length || 0;
    // const newExerciseOrder = dayExerciseCount + 1;
    // const updateExerciseOrder = currentIndex + 1;

    if (selectedRowId && rowSelected) {
      await db()
        .ref(
          `/users/${currentUser?.uid}/workouts/${currentDate}/${exerciseName}`
        )
        .update({
          [selectedRowId]: {
            id: selectedRowId,
            weight: weightValue,
            reps: repValue,
            category: exerciseCategory,
            weightUnit: "kgs",
            exercise: exerciseName,
            order: setOrder,
            exerciseOrder: dayExerciseData?.currentIndex,
          },
        });
    } else {
      const newId = uuid.v4().toString();

      const steps = await db()
        .ref(
          `/users/${currentUser?.uid}/workouts/${currentDate}/${exerciseName}/${newId}`
        )
        .set({
          id: newId,
          order: setOrder + 1,
          weight: weightValue,
          reps: repValue,
          category: exerciseCategory,
          weightUnit: "kgs",
          exercise: exerciseName,
          exerciseOrder: dayExerciseData?.exerciseCount
            ? dayExerciseData?.exerciseCount + 1
            : 1,
        });
    }
  };

  return (
    <View className="flex bg-slate-50 flex-1 w-full rounded-lg pb-4 h-24">
      <View className="flex mx-4 pt-2 border-b-2 border-sky-400">
        <Text>Weight (kgs)</Text>
      </View>
      <View className="flex flex-row justify-center pt-2">
        <Pressable onPress={(arg) => handleWeightStep("down")}>
          <View className="flex bg-slate-500 w-12 h-12  justify-center items-center">
            <Text className="text-white font-bold text-lg">-</Text>
          </View>
        </Pressable>
        <TextInput
          className="border-b-2 border-gray-400 h-12 w-28 text-xl text-center font-semibold"
          onChangeText={setWeightValue}
          value={weightValue.toString()}
          autoCorrect={false}
          keyboardType="numeric"
        />
        <Pressable onPress={(arg) => handleWeightStep("up")}>
          <View className="flex bg-slate-500 w-12 h-12  justify-center items-center">
            <Text className="text-white font-bold text-lg">+</Text>
          </View>
        </Pressable>
      </View>

      <View className="flex mx-4 pt-2 border-b-2 border-sky-400">
        <Text>Reps</Text>
      </View>
      <View className="flex flex-row justify-center pt-2">
        <Pressable onPress={(arg) => handleRepStep("down")}>
          <View className="flex bg-slate-500 w-12 h-12  justify-center items-center">
            <Text className="text-white font-bold text-lg">-</Text>
          </View>
        </Pressable>
        <TextInput
          className="border-b-2 border-gray-400 h-12 w-28 text-xl text-center font-semibold"
          onChangeText={setRepValue}
          value={repValue.toString()}
          // placeholder="weight"
          // clearButtonMode="always"

          autoCorrect={false}
          keyboardType="numeric"
        />
        <Pressable onPress={(arg) => handleRepStep("up")}>
          <View className="flex bg-slate-500 w-12 h-12  justify-center items-center">
            <Text className="text-white font-bold text-lg">+</Text>
          </View>
        </Pressable>
      </View>
      <View className="flex flex-row justify-around my-2">
        <Pressable
          onPress={handleSaveOrUpdateRow}
          className="bg-green-600 p-2 flex-1 m-2 items-center justify-center rounded-md"
        >
          <Text className="text-white">
            {!rowSelected && selectedRowId === null ? "Save" : "Update"}
          </Text>
        </Pressable>
        {!rowSelected && (
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
        )}
      </View>
      <View className="flex flex-row justify-around my-2">
        <FlatList
          data={newdata}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => (
            <RowItem
              order={index}
              id={item.id}
              isSelected={selectedRowId === item.id && rowSelected}
              onPress={handleSelectRow}
              reps={item.reps}
              weight={item.weight}
              weightUnit={item?.weightUnit}
            ></RowItem>
          )}
        />
      </View>
    </View>
  );
};
