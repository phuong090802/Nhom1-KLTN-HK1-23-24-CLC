import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getConversationsSv,
  getMessagesSv,
} from "../../service/user/userMessage.sv";
import { useAuthSocket } from "../../hooks/useAuthSocket";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { toast } from "sonner";
import { DataContext } from "../../store";
import { initParams } from "./constance";

export const AppLayoutContext = createContext({
  params: Object,
  setParams: Function,
  showingModal: String,
  setShowingModal: Function,
  conversations: Array,
  setConversations: Function,
  messageBoxHidden: Boolean,
  setMessageBoxHidden: Function,
  selectedConversation: Object,
  setSelectedConversation: Function,
  conversationContent: Array,
  setConversationContent: Function,
  messageContent: EditorState,
  setMessageContent: Function,
  sendMessage: Function,
  loadMessage: Function,
});

export const AppLayoutStore = ({ children }) => {
  const { user, isLoggedIn } = useContext(DataContext);

  const { authSocket, connected } = useAuthSocket();

  const [showingModal, setShowingModal] = useState("");

  const [conversations, setConversations] = useState([]);

  const [messageBoxHidden, setMessageBoxHidden] = useState(true);

  const [selectedConversation, setSelectedConversation] = useState({});

  const [conversationContent, setConversationContent] = useState([]);

  const [params, setParams] = useState({});

  const [totalMessages, setTotalMessages] = useState(0);

  const [messageContent, setMessageContent] = useState(
    EditorState.createEmpty()
  );

  const getConversations = async () => {
    try {
      const response = await getConversationsSv();
      setConversations(response.conversations);
    } catch (error) {
      toast.error("Lỗi lấy dữ liệu tin nhắn");
    }
  };

  const getConversationContents = async () => {
    try {
      const response = await getMessagesSv(selectedConversation._id, params);
      const newMessages = response.messages;
      setConversationContent((prev) => [...newMessages, ...prev]);
      setTotalMessages(response.totalMessages);
    } catch (error) {}
  };

  const loadMessage = () => {
    if (totalMessages !== conversationContent?.length) {
      setParams((prev) => ({ ...prev, skip: conversationContent?.length }));
    }
  };

  const sendMessage = async () => {
    if (
      draftToHtml(convertToRaw(messageContent.getCurrentContent())).trim() ===
      "<p></p>"
    )
      return;
    try {
      const response = await authSocket.emitWithAck("message:create", {
        conversationId: selectedConversation._id,
        messageContent: draftToHtml(
          convertToRaw(messageContent.getCurrentContent())
        ),
      });
      setConversationContent((prev) => [
        ...prev,
        {
          _id: response.id,
          content: draftToHtml(
            convertToRaw(messageContent.getCurrentContent())
          ),
          sender: user._id,
        },
      ]);
      updateConversations({
        _id: selectedConversation._id,
        lastMessage: {
          _id: response.id,
          content: draftToHtml(
            convertToRaw(messageContent.getCurrentContent())
          ),
          sender: user._id,
        },
      });
      setMessageContent(EditorState.createEmpty());
    } catch (error) {
      console.log(error);
      toast.error("Tin nhắn chưa được gửi đi");
    }
  };

  function updateConversations(newConversation) {
    const index = conversations.findIndex(
      (obj) => obj._id === newConversation._id
    );
    if (index !== -1) {
      const newState = [...conversations];
      newState[index] = newConversation;
      const [updatedConversation] = newState.splice(index, 1);
      newState.unshift(updatedConversation);
      setConversations(newState);
    } else {
      setConversations([...conversations, newConversation]);
    }
  }

  useEffect(() => {
    if (connected && isLoggedIn) {
      authSocket.on(`${user._id}:message:read`, (data) => {
        updateConversations(data?.latestConversation);
        console.log(data);
        if (data?.latestConversation?._id === selectedConversation._id) {
          console.log(data);
          setConversationContent((prev) => [
            ...prev,
            data?.latestConversation?.lastMessage,
          ]);
        }
      });
    }
  }, [connected, isLoggedIn, selectedConversation]);

  useEffect(() => {
    if (isLoggedIn) getConversations();
    else setConversations([]);
  }, [isLoggedIn]);

  useEffect(() => {
    if (!selectedConversation?._id) return;
    getConversationContents();
  }, [params]);

  useEffect(() => {
    if (selectedConversation?._id) setParams(initParams);
  }, [selectedConversation]);

  return (
    <AppLayoutContext.Provider
      value={{
        params,
        setParams,
        showingModal,
        setShowingModal,
        setConversations,
        conversations,
        messageBoxHidden,
        setMessageBoxHidden,
        selectedConversation,
        setSelectedConversation,
        conversationContent,
        messageContent,
        setMessageContent,
        sendMessage,
        loadMessage,
      }}
    >
      {children}
    </AppLayoutContext.Provider>
  );
};
