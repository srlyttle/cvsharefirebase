import React from "react";

export type Context = {
  currentDate: string | null | undefined;
  setCurrentDate: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
};
export const AppContext = React.createContext<Context | null>(null);
