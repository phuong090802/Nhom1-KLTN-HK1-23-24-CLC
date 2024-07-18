import React, { createContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { getConversationsSv } from "../../../services/guest/conversations.sv";

export const MessageScreenContext = createContext();

export const MessageScreenStore = ({ children }) => {
  const [conversations, setConversations] = useState([]);

  // const [selectedConversation, setSelectedConversation] = useState(null);

  const getConversations = async () => {
    try {
      const response = await getConversationsSv();
      console.log(response.conversations);
      setConversations(response.conversations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <MessageScreenContext.Provider
      value={{
        conversations,
        setConversations,
        // selectedConversation,
        // setSelectedConversation,
      }}
    >
      {children}
    </MessageScreenContext.Provider>
  );
};
