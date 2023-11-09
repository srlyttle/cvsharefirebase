import * as React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ExerciseSummary from "../components/ExerciseSummary";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import db from "@react-native-firebase/database";
import { addDays, format } from "date-fns";
import auth from "@react-native-firebase/auth";
import { ExerciseSet } from "../types";
import { parseDbDataToExercises } from "../utils/parseDbDataToExercises";
import { Image } from "expo-image";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAppContext } from "../context/useAppContext";
import SplitSummary from "../components/SplitSummary";

const DashboardScreen = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const dateFormat = "dd-MM-yyyy";
  const { currentUser } = auth();
  const { setCurrentDate, currentDate } = useAppContext();

  const [date, setDate] = React.useState(new Date()); //datepicker local state
  const [isDatePickerVisible, setIsDatePickerVisible] = React.useState(false);
  const [dayExercises, setDayExercises] = React.useState({});

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

  const onPressNewExercise = () => {
    nav.push("Splits");
  };
  const handleChangeDatepicker = (event: unknown, selectedDate?: Date) => {
    setIsDatePickerVisible(false);
    if (selectedDate) {
      setDate(selectedDate);
      setCurrentDate(format(selectedDate, dateFormat));
    }
  };

  const handleNavigateDate = (direction: "forward" | "backward") => () => {
    const offset = direction === "forward" ? 1 : -1;
    setCurrentDate(format(addDays(date, offset), dateFormat));
    setDate((arg) => addDays(arg, offset));
  };

  const handleNavigateToExercise = (
    exerciseName: string,
    exerciseCategory: string
  ) => {
    nav.push("Exercise", {
      exerciseName,
      exerciseCategory,
    });
  };

  // TODO - USE FNS built ins
  const formatDate = (actualDate: string | null | undefined) => {
    if (actualDate === format(new Date(), dateFormat)) {
      return "Today";
    }
    return actualDate;
  };

  const exercises =
    dayExercises &&
    Object.keys(dayExercises).map((excerciseName) => ({
      exerciseName: excerciseName,
      exerciseSets: dayExercises[
        excerciseName as keyof typeof dayExercises
      ] as ExerciseSet[],
    }));

  const currentDateFormatted = formatDate(currentDate);

  return (
    <View className="flex bg-slate-50 flex-1 w-full rounded-lg pb-4">
      <View className="ml-6">
        <Text className="text-black text-lg font-semibold pb-2">
          Curent Split
        </Text>
      </View>
      <SplitSummary
        splitName="4 Day ul pp"
        workouts={["Lower", "Upper", "Pull", "Push"]}
        cycles={6}
        toDeload={2}
        lastWorkout={"Push"}
        nextWorkout={"Lower"}
        workoutGoal="Progressive Overload"
        overloadAmount={10}
        onPress={handleNavigateToExercise}
      />
    </View>
  );
};

export default DashboardScreen;
