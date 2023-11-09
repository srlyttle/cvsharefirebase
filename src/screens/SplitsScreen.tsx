import * as React from "react";
import { View, Text, TextInput, Pressable, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/ExerciseStack";

// type Props = NativeStackScreenProps<RootStackParamList, "SplitsScreen">;

interface ExerciseSplit {
  name: string;
  workouts: Workout[];
}

interface Workout {
  name: string;
  exercises: Exercise[];
}

interface Exercise {
  name: string;
  sets: number;
}

const ExerciseSplitScreen = ({ navigation }: any) => {
  const [splits, setSplits] = React.useState<ExerciseSplit[]>([]);
  const [newSplitName, setNewSplitName] = React.useState("");
  const [newWorkoutName, setNewWorkoutName] = React.useState("");
  const [newExerciseName, setNewExerciseName] = React.useState("");
  const [newExerciseSets, setNewExerciseSets] = React.useState(0);

  const createSplit = () => {
    if (newSplitName) {
      const newSplit: ExerciseSplit = { name: newSplitName, workouts: [] };
      setSplits([...splits, newSplit]);
      setNewSplitName("");
    }
  };

  const createWorkout = (splitIndex: number) => {
    if (newWorkoutName) {
      const newWorkout: Workout = { name: newWorkoutName, exercises: [] };
      const updatedSplits = [...splits];
      updatedSplits[splitIndex].workouts.push(newWorkout);
      setSplits(updatedSplits);
      setNewWorkoutName("");
    }
  };

  const addExercise = (splitIndex: number, workoutIndex: number) => {
    if (newExerciseName && newExerciseSets > 0) {
      const newExercise: Exercise = {
        name: newExerciseName,
        sets: newExerciseSets,
      };
      const updatedSplits = [...splits];
      updatedSplits[splitIndex].workouts[workoutIndex].exercises.push(
        newExercise
      );
      setSplits(updatedSplits);
      setNewExerciseName("");
      setNewExerciseSets(0);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
        Exercise Splits
      </Text>
      <TextInput
        placeholder="New Split Name"
        value={newSplitName}
        onChangeText={setNewSplitName}
      />
      <Pressable onPress={createSplit}>
        <Text>Create Split</Text>
      </Pressable>

      <FlatList
        data={splits}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item, index: splitIndex }) => (
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.name}
            </Text>
            <TextInput
              placeholder="New Workout Name"
              value={newWorkoutName}
              onChangeText={setNewWorkoutName}
            />
            <Pressable onPress={() => createWorkout(splitIndex)}>
              <Text>Create Workout</Text>
            </Pressable>

            {item.workouts.map((workout, workoutIndex) => (
              <View
                key={`${workout.name}-${workoutIndex}`}
                style={{ marginTop: 16 }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {workout.name}
                </Text>
                <TextInput
                  placeholder="New Exercise Name"
                  value={newExerciseName}
                  onChangeText={setNewExerciseName}
                />
                <TextInput
                  placeholder="Number of Sets"
                  keyboardType="numeric"
                  value={newExerciseSets.toString()}
                  onChangeText={(text) => setNewExerciseSets(Number(text))}
                />
                <Pressable
                  onPress={() => addExercise(splitIndex, workoutIndex)}
                >
                  <Text>Add Exercise</Text>
                </Pressable>
                <FlatList
                  data={workout.exercises}
                  keyExtractor={(exercise, exerciseIndex) =>
                    `${exercise.name}-${exerciseIndex}`
                  }
                  renderItem={({ item: exercise }) => (
                    <View style={{ marginTop: 8 }}>
                      <Text>
                        Exercise: {exercise.name}, Sets: {exercise.sets}
                      </Text>
                    </View>
                  )}
                />
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default ExerciseSplitScreen;
