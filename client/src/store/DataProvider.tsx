import { FC, createContext, useState } from 'react';
import { initUser } from './constance';
import { iContextValue, iDataProviderProps, iUser } from './interface';

export const DataContext = createContext<iContextValue>({
  user: initUser,
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  removeUserData: () => {},
  darkMode: false,
  setDarkMode: () => {},
  newMessage: false,
  setNewMessage: () => {},
  newNoti: false,
  setNewNoti: () => {},
});

const DataProvider: FC<iDataProviderProps> = ({ children }) => {
  const [user, setUser] = useState<iUser>(initUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState(false);
  const [newNoti, setNewNoti] = useState(false);

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
        newMessage,
        setNewMessage,
        newNoti,
        setNewNoti,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
