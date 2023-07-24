import React from "react";
import { AppContext } from "./AppContext";
import { format } from "date-fns";

interface Props {
  children: React.ReactNode;
}
export const AppContextProvider = ({ children }: Props) => {
  const [currentDate, setCurrentDate] = React.useState<
    null | string | undefined
  >(format(new Date(), "dd-MM-yyyy"));
  return (
    <AppContext.Provider value={{ currentDate, setCurrentDate }}>
      {children}
    </AppContext.Provider>
  );
};
