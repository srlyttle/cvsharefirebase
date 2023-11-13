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
import { RootStackParamList } from "../navigation/ExerciseStack";
import uuid from "react-native-uuid";
import RowItem from "../components/RowItem";
import auth from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";
import { parseDbDataToExercises } from "../utils/parseDbDataToExercises";
import { useAppContext } from "../context/useAppContext";
import Toast from "react-native-toast-message";
import { ExerciseSet } from "../types";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { ExerciseTrack } from "../components/ExerciseTrack";
import { ExerciseHistory } from "../components/ExerciseHistory";

type Props = NativeStackScreenProps<RootStackParamList, "Exercise">;

type DayExercises = {
  [key: string]: ExerciseSet[];
};

const ExerciseScreen = ({ route }: Props) => {
  const { currentUser } = auth();
  const { setCurrentDate, currentDate } = useAppContext();
  const { exerciseName, exerciseCategory, currentIndex, dayExerciseCount } =
    route.params;

  const [dayExercises, setDayExercises] = React.useState<DayExercises>({});
  const [weightValue, setWeightValue] = React.useState<string>("");
  const [repValue, setRepValue] = React.useState<string>("");
  const [category, setCategory] = React.useState<string | null>(null);

  const [rowSelected, setRowSelected] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = React.useState<string | null>(null);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "track", title: "Track" },
    { key: "history", title: "History" },
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

  const newdata = dayExercises && dayExercises[exerciseName];

  const TabScene = ({ route }: any) => {
    if (route.key === "track") {
      return (
        <ExerciseTrack
          exerciseName={exerciseName}
          exerciseCategory={exerciseCategory}
          currentIndex={currentIndex}
          dayExerciseCount={dayExerciseCount}
        />
      );
    } else if (route.key === "history") {
      return (
        <ExerciseHistory
          exerciseName={exerciseName}
          exerciseCategory={exerciseCategory}
        />
        // <View />
      );
    }

    return null;
  };

  const renderScene = ({ route }: any) => <TabScene route={route} />;

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: "white", // Blue underline for the selected tab
        height: 4, // Adjust the thickness of the underline
      }}
      style={{ backgroundColor: "black" }} // Black background for the tab bar
      labelStyle={{ color: "white" }} // White text for tab labels
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default ExerciseScreen;
