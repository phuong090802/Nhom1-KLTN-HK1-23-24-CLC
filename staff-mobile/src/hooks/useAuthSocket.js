import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const useAuthSocket = () => {
  const [authSocket, setAuthSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        console.log('useAuthSocket', token);
        initializeSocket(token);
      } catch (error) {
        console.error('Token error:', error);
      }
    };
    getToken();
  }, []);

  const initializeSocket = (token) => {
    try {
      const socket = io(`${process.env.EXPO_PUBLIC_API_URL}/auth`, {
        withCredentials: true,
        autoConnect: false,
        extraHeaders: {
          authorization: `bearer ${token}`,
        },
      });
      setAuthSocket(socket);
    } catch (error) {
      console.error('Error initializing socket:', error);
    }
  };

  useEffect(() => {
    if (authSocket) {
      const handleConnect = () => {
        console.log('connected');
        setConnected(true);
      };

      const handleDisconnect = () => {
        console.log('disconnected');
        setConnected(false);
      };

      authSocket.on('connect', handleConnect);
      authSocket.on('disconnect', handleDisconnect);
      authSocket.on('connect_error', (error) =>
        console.log('connect_error', error.data)
      );

      return () => {
        authSocket.off('connect', handleConnect);
        authSocket.off('disconnect', handleDisconnect);
      };
    }
  }, [authSocket]);

  useEffect(() => {
    if (!authSocket) {
      return;
    }
    if (!connected) {
      authSocket.connect();
    }
  }, [authSocket, connected]);

  return {
    connected,
    setConnected,
    authSocket,
  };
};
