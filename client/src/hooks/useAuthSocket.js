import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';

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
    const onConnect = () => {
      console.log('socket "/auth" connected');
      // console.log('accessToken', authSocket._opts.extraHeaders.authorization);
      // console.log('retry', authSocket._opts.extraHeaders.retry);
      authSocket._opts.extraHeaders.retry = false;
      setConnected(true);
    };
    const onDisconnect = () => {
      console.log('socket "/auth" disconnected');
      setConnected(false);
    };
    const onConnectError = async (error) => {
      // console.log('socket "/auth" connectError');
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
          authSocket._opts.extraHeaders.authorization = `bearer ${token}`;
          authSocket.connect();
        } catch (rfError) {
          // setConnected(false);
        } finally {
          authSocket._opts.extraHeaders.retry = true;
        }
      }
    };

    authSocket.on('connect', onConnect);
    authSocket.on('disconnect', onDisconnect);
    authSocket.on('connect_error', onConnectError);

    return () => {
      authSocket.off('connect', onConnect);
      authSocket.off('disconnect', onDisconnect);
      authSocket.on('connect_error', onConnectError);
    };
  }, []);

  return {
    connected,
    setConnected,
    authSocket,
  };
};
