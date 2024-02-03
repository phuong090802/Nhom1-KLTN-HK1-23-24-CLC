const { io } = require("socket.io-client");

const socket = io(import.meta.env.VITE_SOCKET_BASE_URL, {
    withCredentials: true,
    autoConnect: false
})

export default socket