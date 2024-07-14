import { createContext } from 'react';

export const VerifyAccountContext = createContext();

export const VerifyAccountStore = ({ children }) => {
  return (
    <VerifyAccountContext.Provider value={{}}>
      {children}
    </VerifyAccountContext.Provider>
  );
};
