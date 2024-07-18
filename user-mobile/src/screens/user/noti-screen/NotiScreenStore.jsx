import React, { createContext, useContext, useEffect, useState } from "react";
import { getNotificationsSv } from "../../../services/guest/notification.sv";
import { useAuthorSocketHook } from "../../../hooks/useAuthorSocketHook";
import { DataContext } from "../../../store/Store";

export const NotiScreenContext = createContext({ notifications: [] });

export const NotiScreenStore = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const { user } = useContext(DataContext);

  const { authorSocket, connected } = useAuthorSocketHook();

  useEffect(() => {
    if (!authorSocket) return;
    if (connected && user.isLoggedIn) {
      authorSocket.on(`${user._id}:notification:read`, (data) => {
        console.log(`${user._id}:notification:read`, data);
        setNotifications((prev) => [data.lastNotification, ...prev]);
        // setNewNoti(true);
        // setNotification((prev) => [data.lastNotification, ...prev]);
      });
    }
  }, [connected, user]);

  const getNotifications = async () => {
    try {
      const response = await getNotificationsSv();
      setNotifications(response.notifications);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <NotiScreenContext.Provider value={{ notifications }}>
      {children}
    </NotiScreenContext.Provider>
  );
};
