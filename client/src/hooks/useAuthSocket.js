import { useEffect, useState } from "react";
import { authSocket } from "../socket/auth.socket";
import { refreshTokenSv } from "../service/public/auth.sv";
import Cookies from "js-cookie";

export const useAuthSocket = () => {
  const [connected, setConnected] = useState(authSocket.connected);

  useEffect(() => {
    if (!connected) {
      authSocket.connect();
    }
  }, [connected]);

  useEffect(() => {
    const onConnect = () => {
      console.log('socket "/auth" connected');
      setConnected(true);
    };
    const onDisconnect = () => {
      console.log('socket "/auth" disconnected');
      setConnected(false);
    };
    const onConnectError = async (error) => {
      console.log('socket "/auth" connectError');
      authSocket.close();
      if (error?.data?.code === 4041 || error?.data?.code === 4042) {
        console.log("authSocket refresh token");
        try {
          const response = await refreshTokenSv();
          Cookies.set("accessToken", response.token);
          authSocket._opts.extraHeaders.authorization = `bearer ${response.token}`;
          authSocket.connect();
        } catch (rfError) {
          console.log(rfError);
        } finally {
          setConnected(false);
        }
      }
    };

    authSocket.on("connect", onConnect);
    authSocket.on("disconnect", onDisconnect);
    authSocket.on("connect_error", onConnectError);

    return () => {
      authSocket.off("connect", onConnect);
      authSocket.off("disconnect", onDisconnect);
    };
  }, []);

  return {
    connected,
    setConnected,
    authSocket,
  };
};
