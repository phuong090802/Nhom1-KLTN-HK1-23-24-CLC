import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';

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
        error?.data?.code === 4040 ||
        error?.data?.code === 4041 ||
        error?.data?.code === 4042
        // && !isError
      ) {
        console.log('authSocket refresh token');
        try {
          console.log('socket rf token');
          const response = await refreshTokenSv();
          Cookies.set('accessToken', response.token);
          authSocket._opts.extraHeaders.authorization = `bearer ${response.token}`;
          authSocket.connect();
        } catch (rfError) {
          setConnected(false);
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
