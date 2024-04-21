import React, { createContext } from "react";

export const HistoryContext = createContext();

export const HistoryStore = ({ children }) => {
  return (
    <HistoryContext.Provider value={{}}>{children}</HistoryContext.Provider>
  );
};
