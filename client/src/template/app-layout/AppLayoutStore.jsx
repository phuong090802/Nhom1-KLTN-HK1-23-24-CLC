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
import { getNotificationSv } from "../../service/user/userNotification.sv";
import { data } from "autoprefixer";

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
  notifications: Array,
  setNotification: Function,
});

export const AppLayoutStore = ({ children }) => {
  const { user, isLoggedIn, setNewMessage, setNewNoti } =
    useContext(DataContext);

  const { authSocket, connected } = useAuthSocket();

  const [showingModal, setShowingModal] = useState(""); // modal đang hiển thị

  const [conversations, setConversations] = useState([]); // chứa những cuộc hội thoại

  const [notifications, setNotification] = useState([]); // chứa danh sách thông báo

  const [messageBoxHidden, setMessageBoxHidden] = useState(true); // show messageBox

  const [selectedConversation, setSelectedConversation] = useState({}); // Hội thoại đang xem

  const [conversationContent, setConversationContent] = useState([]); // nội dung conversation được chọn

  const [params, setParams] = useState({}); //

  const [totalMessages, setTotalMessages] = useState(0); // số lượng tin nhắn

  const [messageContent, setMessageContent] = useState(
    EditorState.createEmpty()
  );

  // lấy danh sách các cuộc hội thoại
  const getConversations = async () => {
    try {
      const response = await getConversationsSv();
      setConversations(response.conversations);
    } catch (error) {
      toast.error("Lỗi lấy dữ liệu tin nhắn");
    }
  };

  // Lấy nội dung của cuộc hội thoại
  const getConversationContents = async () => {
    try {
      const response = await getMessagesSv(selectedConversation._id, params);
      const newMessages = response.messages;
      setConversationContent((prev) => [...newMessages, ...prev]);
      setTotalMessages(response.totalMessages);
    } catch (error) {}
  };

  //
  const loadMessage = () => {
    if (totalMessages !== conversationContent?.length) {
      setParams((prev) => ({ ...prev, skip: conversationContent?.length }));
    }
  };

  // Gửi tin nhắn
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

  //
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

  //Lấy danh sách thông báo
  const getNotifications = async () => {
    try {
      const response = await getNotificationSv();
      console.log("getNotifications", response.notifications);
      setNotification(response.notifications);
    } catch (error) {
      toast.error(error.message || "Lỗi khi lấy thông báo");
    }
  };

  useEffect(() => {
    if (connected && isLoggedIn) {
      authSocket.on(`${user._id}:message:read`, (data) => {
        console.log(data);
        setNewMessage(true);
        updateConversations(data?.latestConversation);
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
    if (connected && isLoggedIn) {
      authSocket.on(`${user._id}:notification:read`, (data) => {
        console.log(data);
        setNewNoti(true);
        setNotification((prev) => [data.lastNotification, ...prev]);
      });
    }
  }, [connected, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      if (user.role !== "ADMIN" && user.role !== "SUPERVISOR") {
        getNotifications();
        getConversations();
      }
    } else {
      setConversations([]);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setShowingModal("");
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
        notifications,
        setNotification,
      }}
    >
      {children}
    </AppLayoutContext.Provider>
  );
};
