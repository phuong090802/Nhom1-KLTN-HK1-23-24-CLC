import React, { createContext, useEffect, useState } from "react";
import { getConversationsSv } from "../../../service/cousellor/counsellorConversation.sv";

export const CounsellorConversationContext = createContext({
  conversations: Array,
  selectedConversation: String,
  setSelectedConversation: Function,
});

export const CounsellorConversationProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);

  const [selectedConversation, setSelectedConversation] = useState(null);

  const getConversation = async () => {
    try {
      const response = await getConversationsSv();
      setConversations(response.conversations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConversation();
  }, []);

  return (
    <CounsellorConversationContext.Provider
      value={{
        conversations,
        selectedConversation,
        setSelectedConversation,
      }}
    >
      {children}
    </CounsellorConversationContext.Provider>
  );
};
