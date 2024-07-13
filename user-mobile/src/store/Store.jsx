import { createContext, useState } from 'react';

import { initUSer } from './const';

export const DataContext = createContext();

const Store = ({ children }) => {
  const [user, setUser] = useState(initUSer);

  const clearUserData = () => {
    setUser(initUSer);
  };

  const value = {
    user,
    setUser,
    clearUserData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default Store;
