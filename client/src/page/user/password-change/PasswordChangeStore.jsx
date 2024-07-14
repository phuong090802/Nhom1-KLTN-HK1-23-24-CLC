import React, { createContext } from 'react';

export const PasswordChangeContext = createContext();

export const PasswordChangeStore = ({ children }) => {
  return (
    <PasswordChangeContext.Provider value={{}}>
      {children}
    </PasswordChangeContext.Provider>
  );
};
