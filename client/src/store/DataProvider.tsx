import { FC, createContext, useState } from "react";
import { iContextValue, iDataProviderProps, iUser } from "./interface";
import { initUser } from "./constance";

export const DataContext = createContext<iContextValue>({
  user: initUser,
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  removeUserData: () => {},
  darkMode: false,
  setDarkMode: () => {},
});

const DataProvider: FC<iDataProviderProps> = ({ children }) => {
  const [user, setUser] = useState<iUser>(initUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const removeUserData = () => {
    setUser(initUser);
    setIsLoggedIn(false);
  };

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        removeUserData,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
