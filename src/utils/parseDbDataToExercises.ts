export const parseDbDataToExercises = (
  exercisesForDay: Record<
    string,
    Record<
      string,
      {
        id: string;
        order: number;
        reps: string;
        weight: string;
      }
    >
  >
) => {
  return (
    exercisesForDay &&
    Object.keys(exercisesForDay).reduce((allExercises, exerciseName) => {
      const setIds = Object.keys(exercisesForDay[exerciseName]);
      const parsedSets = setIds.map((setId) => {
        const rawSet = exercisesForDay[exerciseName][setId];
        return {
          id: setId,
          isPersonalBest: false,
          weight: rawSet.weight,
          weightUnit: "kgs",
          reps: rawSet.reps,
          order: rawSet.order,
        };
      });

      return {
        ...allExercises,
        [exerciseName]: [
          ...(allExercises?.[exerciseName as keyof typeof allExercises]
            ? allExercises?.[exerciseName as keyof typeof allExercises]
            : []),
          ...parsedSets,
        ].sort((a, b) => a.order - b.order),
      };
    }, {})
  );
};
