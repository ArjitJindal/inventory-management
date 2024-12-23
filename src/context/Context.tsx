"use client";

import React, { createContext, useState, ReactNode } from "react";

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
