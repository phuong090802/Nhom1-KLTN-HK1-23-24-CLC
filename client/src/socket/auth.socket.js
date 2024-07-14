import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

const socketUrl = `${import.meta.env.VITE_API_BASE_URL}/auth`;

// console.log('connecting to', socketUrl);

const authSocket = io(socketUrl, {
  withCredentials: true,
  autoConnect: false,
  extraHeaders: {
    retry: false,
    authorization: `bearer ${Cookies.get('accessToken')}`,
  },
});

export { authSocket };
