import React from "react";
import { AppContext, DayData } from "./AppContext";
import { format } from "date-fns";

interface Props {
  children: React.ReactNode;
}
export const AppContextProvider = ({ children }: Props) => {
  const [currentDate, setCurrentDate] = React.useState<
    null | string | undefined
  >(format(new Date(), "dd-MM-yyyy"));

  const [dayExerciseData, setDayExerciseData] = React.useState<
    DayData | null | undefined
  >(null);
  return (
    <AppContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        dayExerciseData,
        setDayExerciseData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
