import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { refreshTokenSv } from '../service/public/auth.sv';
import { authSocket } from '../socket/auth.socket';
import { DataContext } from '../store';

export const useAuthSocket = () => {
  const [connected, setConnected] = useState(authSocket.connected);
  const { isLoggedIn } = useContext(DataContext);

  useEffect(() => {
    if (!connected && isLoggedIn) {
      authSocket.connect();
    }
    if (connected && !isLoggedIn) {
      authSocket.close();
    }
  }, [connected, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
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
      if (
        (error?.data?.code === 4040 ||
          error?.data?.code === 4041 ||
          error?.data?.code === 4042) &&
        !authSocket._opts.extraHeaders.retry
      ) {
        try {
          console.log('socket refresh token');
          const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/`;
          const response = await axios.post(
            `${baseURL}auth/refresh-token`,
            {},
            {
              withCredentials: true,
            }
          );
          const token = response.data.token;
          Cookies.set('accessToken', token);
          authSocket._opts.extraHeaders.retry = true;
          console.log(authSocket._opts.extraHeaders);
          authSocket._opts.extraHeaders.authorization = `bearer ${token}`;
          authSocket.connect();
        } catch (rfError) {
          // setConnected(false);
        }
      }
    };

    authSocket.on('connect', onConnect);
    authSocket.on('disconnect', onDisconnect);
    authSocket.on('connect_error', onConnectError);

    return () => {
      authSocket.off('connect', onConnect);
      authSocket.off('disconnect', onDisconnect);
    };
  }, [isLoggedIn]);

  return {
    connected,
    setConnected,
    authSocket,
  };
};
