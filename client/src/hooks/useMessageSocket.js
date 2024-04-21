import { useEffect, useState } from "react";
import { messageSocket } from "../socket/message.socket";
import { refreshTokenSv } from "../service/public/auth.sv";
import Cookies from "js-cookie";
export const useMessageSocket = () => {
  const [connected, setConnected] = useState(messageSocket.connected);

  useEffect(() => {
    console.log("connected", connected);
    if (!connected) {
      messageSocket.connect();
    }
  }, [connected]);

  useEffect(() => {
    const onConnect = () => {
      console.log('socket "/messages" connected');
      setConnected(true);
    };
    const onDisconnect = () => {
      console.log('socket "/messages" disconnected');
      setConnected(false);
    };
    const onConnectError = async (error) => {
      console.log('socket "/messages" connectError', error);
      messageSocket.close();
      if (error.data?.code === 4041 || error.data?.code === 4042) {
        console.log("messageSocket refresh token");
        try {
          const response = await refreshTokenSv();
          Cookies.set("accessToken", response.token);
          messageSocket._opts.extraHeaders.authorization = `bearer ${response.token}`;
          messageSocket.connect();
        } catch (rfError) {
          console.log(rfError);
        } finally {
          setConnected(false);
        }
      }
    };

    messageSocket.on("connect", onConnect);
    messageSocket.on("disconnect", onDisconnect);
    messageSocket.on("connect_error", (error) => onConnectError(error));

    return () => {
      messageSocket.off("connect", onConnect);
      messageSocket.off("disconnect", onDisconnect);
    };
  }, []);

  return {
    connected,
    setConnected,
    messageSocket,
  };
};
