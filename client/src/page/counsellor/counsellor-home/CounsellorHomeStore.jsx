import { createContext } from 'react';

export const CounsellorHomeContext = createContext();

export const CounsellorHomeStore = ({ children }) => {
  return (
    <CounsellorHomeContext.Provider value={{}}>
      {children}
    </CounsellorHomeContext.Provider>
  );
};
