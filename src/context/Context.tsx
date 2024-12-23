"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { IProjectT } from "../types/project";

interface ISharedState {
  view: "admin" | "user" | "";
}

interface MyContextType {
  sharedState: ISharedState;
  setSharedState: (value: ISharedState) => void;
}

export const MyContext = createContext<MyContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [sharedState, setSharedState] = useState<ISharedState>({
    view: "",
  });

  return (
    <MyContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
