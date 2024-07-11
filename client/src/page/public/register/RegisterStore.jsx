import React, { createContext } from "react";

export const RegisterContext = createContext();

export const RegisterStore = ({ children }) => {
  return (
    <RegisterContext.Provider value={{}}>{children}</RegisterContext.Provider>
  );
};
