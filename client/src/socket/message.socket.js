import { io } from "socket.io-client";
import Cookies from "js-cookie";

// const socketUrl = import.meta.env.VITE_SOCKET_HOST_URL + "messages";
const socketUrl = import.meta.env.VITE_SOCKET_BASE_URL + "messages";

console.log("connecting to", socketUrl);

const messageSocket = io(socketUrl, {
  withCredentials: true,
  autoConnect: false,
  extraHeaders: {
    authorization: `bearer ${Cookies.get("accessToken")}`,
  },
});

export { messageSocket };
