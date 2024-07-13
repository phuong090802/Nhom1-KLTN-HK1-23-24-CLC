import React, { createContext } from "react";

export const NotiScreenContext = createContext();

export const NotiScreenStore = ({ children }) => {
  return (
    <NotiScreenContext.Provider value={{}}>
      {children}
    </NotiScreenContext.Provider>
  );
};
