import { io } from "socket.io-client";

console.log(import.meta.env.VITE_SOCKET_BASE_URL);

const authSocket = io(import.meta.env.VITE_SOCKET_BASE_URL,
    {
        withCredentials: true,
        autoConnect: false,
    })

const checkEmailExist = async (email) => {
    console.log(email);
    try {
        const response = await authSocket
            .emitWithAck('register:validate-email', email)
        return response.success
    } catch (error) {
        return false
    }
};

const checkPhoneExist = async (phone) => {
    try {
        const response = await authSocket
            .emitWithAck('register:validate-phone-number', phone)
        return response.code
    } catch (error) {
        return 5000
    }
};

export {
    authSocket,
    checkEmailExist,
    checkPhoneExist
};
