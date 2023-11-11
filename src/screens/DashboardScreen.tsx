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

const DashboardScreen = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const dateFormat = "dd-MM-yyyy";
  const { currentUser } = auth();
  const { setCurrentDate, currentDate, setDayExerciseData } = useAppContext();

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
    const count =
      dayExercises &&
      Object.keys(dayExercises).map((excerciseName) => ({
        exerciseName: excerciseName,
        exerciseSets: dayExercises[
          excerciseName as keyof typeof dayExercises
        ] as ExerciseSet[],
      }))?.length;
    setDayExerciseData({
      exerciseCount: count,
      currentIndex: count + 1,
    });
    nav.push("AllExercises");
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
    exerciseCategory: string,
    currentIndex: number,
    dayExerciseCount: number
  ) => {
    setDayExerciseData({ exerciseCount: dayExerciseCount, currentIndex });
    nav.push("Exercise", {
      exerciseName,
      exerciseCategory,
      currentIndex,
      dayExerciseCount,
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
    Object.keys(dayExercises)
      .map((excerciseName) => ({
        exerciseName: excerciseName,
        order:
          (
            dayExercises[
              excerciseName as keyof typeof dayExercises
            ] as ExerciseSet[]
          )?.[0].exerciseOrder || 0,
        exerciseSets: dayExercises[
          excerciseName as keyof typeof dayExercises
        ] as ExerciseSet[],
      }))
      .sort((a, b) => a.order - b.order);

  const currentDateFormatted = formatDate(currentDate);

  return (
    <View className="flex bg-slate-50 flex-1 w-full rounded-lg pb-4">
      <View className="bg-black flex flex-row justify-between px-4 items-center border-b-2 border-sky-300">
        <Image
          style={{ width: 100, height: 75 }}
          source={require("../../assets/logogainz.png")}
        />
        <View className="bg-black">
          <Pressable onPress={() => setIsDatePickerVisible(true)}>
            <Ionicons name="calendar-outline" size={25} color="white" />
          </Pressable>
        </View>
        <View className="bg-black">
          <Pressable onPress={onPressNewExercise}>
            <Ionicons name="add" size={25} color="white" />
          </Pressable>
        </View>
        {/* <View className="bg-black">
          <Ionicons name="menu" size={25} color="white" />
        </View> */}
      </View>
      {!isDatePickerVisible && (
        <View className="flex flex-row align-middle justify-between items-center py-4">
          <Pressable onPress={handleNavigateDate("backward")}>
            <Ionicons name="chevron-back" size={25} color="black" />
          </Pressable>
          <Text className="text-black text-lg font-semibold pb-2">
            {currentDateFormatted}
          </Text>
          <Pressable onPress={handleNavigateDate("forward")}>
            <Ionicons name="chevron-forward" size={25} color="black" />
          </Pressable>
        </View>
      )}

      {isDatePickerVisible && (
        <View className="h-full">
          <Pressable onPress={() => setIsDatePickerVisible(true)}></Pressable>

          <View>
            <DateTimePicker
              testID="dateTimePicker"
              value={date ? new Date(date) : new Date()}
              mode="date"
              onChange={handleChangeDatepicker}
              display="inline"
            />
            <Pressable onPress={() => setIsDatePickerVisible(false)}>
              <Text>Done</Text>
            </Pressable>
          </View>
        </View>
      )}
      <FlatList
        data={exercises}
        renderItem={({ item, index }) => (
          <ExerciseSummary
            exerciseName={item.exerciseName}
            exerciseSets={item.exerciseSets}
            onPress={handleNavigateToExercise}
            currentIndex={index || 0}
            dayExerciseCount={exercises?.length || 0}
          />
        )}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        keyExtractor={(item, index) => item.exerciseName}
      />
    </View>
  );
};

export default DashboardScreen;
