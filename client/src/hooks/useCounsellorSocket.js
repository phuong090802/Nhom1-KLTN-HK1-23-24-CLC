import { useEffect, useState } from "react";
import { counsellorSocket } from "../socket/cousellor.socket";
import { refreshTokenSv } from "../service/public/auth.sv";
import Cookies from "js-cookie";
const useCounsellorSocket = () => {
  const [connected, setConnected] = useState(counsellorSocket.connected);

  useEffect(() => {
    console.log("connected", connected);
    if (!connected) {
      counsellorSocket.connect();
    }
  }, [connected]);

  useEffect(() => {
    const onConnect = () => {
      console.log('socket "/counsellor" connected');
      setConnected(true);
    };
    const onDisconnect = () => {
      console.log('socket "/counsellor" disconnected');
      setConnected(false);
    };
    const onConnectError = async (error) => {
      console.log('socket "/counsellor" connectError');
      counsellorSocket.close();
      if (error.data.code === 4041 || error.data.code === 4042) {
        console.log("counsellorSocket refresh token");
        try {
          const response = await refreshTokenSv();
          Cookies.set("accessToken", response.token);
          counsellorSocket._opts.extraHeaders.authorization = `bearer ${response.token}`;
          counsellorSocket.connect();
        } catch (rfError) {
          console.log(rfError);
        } finally {
          setConnected(false);
        }
      }
    };

    counsellorSocket.on("connect", onConnect);
    counsellorSocket.on("disconnect", onDisconnect);
    counsellorSocket.on("connect_error", (error) => onConnectError(error));

    return () => {
      counsellorSocket.off("connect", onConnect);
      counsellorSocket.off("disconnect", onDisconnect);
    };
  }, []);

  return {
    connected,
    setConnected,
    counsellorSocket,
  };
};

export { useCounsellorSocket };
