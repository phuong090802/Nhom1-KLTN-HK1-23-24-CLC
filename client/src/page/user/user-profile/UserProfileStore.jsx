import React, { createContext } from "react";

export const UserProfileContext = createContext();

export const UserProfileStore = ({ children }) => {
  return (
    <UserProfileContext.Provider value={{}}>
      {children}
    </UserProfileContext.Provider>
  );
};
