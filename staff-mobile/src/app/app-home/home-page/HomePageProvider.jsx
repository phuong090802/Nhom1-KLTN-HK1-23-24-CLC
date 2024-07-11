import React, { createContext } from "react";

export const HomePageContext = createContext();

export const HomePageProvider = ({ children }) => {
  return (
    <HomePageContext.Provider value={{}}>{children}</HomePageContext.Provider>
  );
};
