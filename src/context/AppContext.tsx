import React from "react";

export interface DayData {
  exerciseCount: number;
  currentIndex: number;
}
export type Context = {
  currentDate: string | null | undefined;
  setCurrentDate: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  dayExerciseData: DayData | null | undefined;
  setDayExerciseData: React.Dispatch<
    React.SetStateAction<DayData | null | undefined>
  >;
};
export const AppContext = React.createContext<Context | null>(null);
