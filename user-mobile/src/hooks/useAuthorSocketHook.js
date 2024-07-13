import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const useAuthorSocketHook = () => {
  const [authorSocket, setAuthorSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        console.log(token);
        initializeSocket(token);
      } catch (error) {
        console.error("Token error:", error);
      }
    };
    getToken();
  }, []);

  const initializeSocket = (token) => {
    try {
      const socket = io(process.env.EXPO_PUBLIC_HOST_SOCKET_URL + "auth", {
        withCredentials: true,
        autoConnect: false,
        extraHeaders: {
          authorization: `bearer ${token}`,
        },
      });
      setAuthorSocket(socket);
    } catch (error) {
      console.error("Error initializing socket:", error);
    }
  };

  useEffect(() => {
    if (authorSocket) {
      const handleConnect = () => {
        console.log("connected");
        setConnected(true);
      };

      const handleDisconnect = () => {
        console.log("disconnected");
        setConnected(false);
      };

      authorSocket.on("connect", handleConnect);
      authorSocket.on("disconnect", handleDisconnect);
      authorSocket.on("connect_error", (error) => console.log(error.data));

      return () => {
        authorSocket.off("connect", handleConnect);
        authorSocket.off("disconnect", handleDisconnect);
      };
    }
  }, [authorSocket]);

  const createQuestion = async (data) => {
    if (!authorSocket) return;
    try {
      const response = await authorSocket.emitWithAck("question:create", data);
      Alert.alert("Đặt câu hỏi thành công");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!authorSocket) return;
    if (!connected) {
      authorSocket.connect();
    }
  }, [authorSocket, connected]);

  return {
    connected,
    setConnected,
    authorSocket,
    createQuestion
  };
};
