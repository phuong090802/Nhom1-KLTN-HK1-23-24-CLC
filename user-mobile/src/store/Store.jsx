import { createContext, useState } from "react";

import { initUSer } from "./const";

export const DataContext = createContext();

const Store = ({ children }) => {
  const [user, setUser] = useState(initUSer);

  const [newNoti, setNewNoti] = useState(false);

  const [newMessage, setNewMessage] = useState(false);

  const [selectedConversationId, setSelectedConversationId] = useState(null);

  const clearUserData = () => {
    setUser(initUSer);
  };

  const value = {
    user,
    setUser,
    clearUserData,
    newNoti,
    setNewNoti,
    newMessage,
    setNewMessage,
    selectedConversationId,
    setSelectedConversationId,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default Store;
