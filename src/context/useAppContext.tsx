import React from "react";
import { AppContext } from "./AppContext";

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("component must be wrapped in a provider");
  }
  return context;
};
