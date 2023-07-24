import * as React from "react";
import { View, Text, TextInput, FlatList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Row from "../components/Row";
import { allExercisesData } from "../data/allexercises";

const AllExercisesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [searchValue, onChangeSearchValue] = React.useState("");
  const [category, setCategory] = React.useState<string | null>(null);

  const exerciseMap = React.useMemo(
    () =>
      allExercisesData.reduce<Record<string, string[]>>((prev, next) => {
        const categoryHasExercise = (
          prev?.[next?.category as keyof typeof prev] as string[]
        )?.includes(next.exercise);

        return {
          ...prev,
          [next.category]: [
            ...(prev[next?.category as keyof typeof prev]
              ? prev[next.category as keyof typeof prev]
              : []),
            ...(categoryHasExercise ? [] : [next.exercise]),
          ],
        };
      }, {}),
    []
  );

  const uniqueCategories = Object.keys(exerciseMap);
  const allUniqueExercises = Object.values(exerciseMap).flat() as string[];

  const dataToFilter = category
    ? exerciseMap[category as keyof typeof exerciseMap]
    : allUniqueExercises;
  const filteredData = searchValue
    ? dataToFilter.filter(
        (arg) =>
          arg &&
          searchValue?.length > 0 &&
          arg.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    : dataToFilter;

  const getExerciseByCategory = (category: string) => {
    setCategory(category);
  };

  const handleResetCategories = () => {
    setCategory(null);
  };

  const handleNavigateToExercise = (exerciseName: string) => {
    setCategory(null);
    const selectedCategory = Object.keys(exerciseMap).reduce((prev, next) => {
      if (prev !== "") {
        return prev;
      }
      if (
        exerciseMap[next as keyof typeof exerciseMap].includes(exerciseName)
      ) {
        return next;
      }
      return "";
    }, "");

    navigation.push("Exercise", {
      exerciseName,
      exerciseCategory: selectedCategory,
    });
  };
  return (
    <View className="flex bg-slate-50 flex-1 w-full rounded-lg pb-4 h-24">
      <View className="flex p-4">
        <TextInput
          className="w-full border-b-2 border-sky-400"
          onChangeText={onChangeSearchValue}
          value={searchValue}
          placeholder="search"
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {category && (
        <View className="flex bg-gray-200 justify-center items-center shadow-sm h-6">
          <Pressable onPress={handleResetCategories}>
            <Text className="font-light">search in all categories</Text>
          </Pressable>
        </View>
      )}
      {searchValue || category ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => item}
          renderItem={(arg) => (
            <Row
              content={arg.item}
              subContent="8 workouts"
              onPress={() => handleNavigateToExercise(arg.item)}
              id={`${arg.item}`}
            />
          )}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      ) : (
        <FlatList
          data={uniqueCategories}
          keyExtractor={(item, index) =>
            // `${item.Exercise}${item.Exercise}${index}`
            item
          }
          renderItem={(arg) => (
            <Row
              id={`${arg.item}`}
              content={arg.item}
              onPress={() => getExerciseByCategory(arg.item)}
            />
          )}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      )}
    </View>
  );
};

export default AllExercisesScreen;
