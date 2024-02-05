import { io } from "socket.io-client";

const authSocket = io(import.meta.env.VITE_SOCKET_BASE_URL + 'auth',
    {
        withCredentials: true,
        autoConnect: false,
    })

const checkEmailExist = async (email) => {
    try {
        const response = await authSocket
            .emitWithAck('check-email-exists', email)
        return response.code
    } catch (error) {
        return 5000
    }
};

const checkPhoneExist = async (phone) => {
    console.log('sdt');
    try {
        const response = await authSocket
            .emitWithAck('check-phone-number-exists', phone)
        console.log(response);
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
