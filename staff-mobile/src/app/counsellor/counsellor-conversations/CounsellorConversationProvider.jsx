import { createContext, useEffect, useState } from 'react';
import { getConversationsSv } from '../../../service/cousellor/counsellorConversation.sv';

export const CounsellorConversationContext = createContext({
  conversations: [],
  selectedConversation: '',
  setSelectedConversation: (conversation) => {},
});

export const CounsellorConversationProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const getConversation = async () => {
    try {
      const response = await getConversationsSv();
      setConversations(response.conversations);
    } catch (error) {
      console.log('getConversation', error);
    }
  };

  useEffect(() => {
    getConversation();
  }, []);

  const values = {
    conversations,
    selectedConversation,
    setSelectedConversation,
  };

  return (
    <CounsellorConversationContext.Provider value={values}>
      {children}
    </CounsellorConversationContext.Provider>
  );
};
