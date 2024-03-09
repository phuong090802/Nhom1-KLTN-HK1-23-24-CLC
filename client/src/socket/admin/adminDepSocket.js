import { io } from "socket.io-client";

console.log(import.meta.env.VITE_SOCKET_BASE_URL);

const adminDepSocket = io(import.meta.env.VITE_SOCKET_BASE_URL,
    {
        withCredentials: true,
        autoConnect: false,
    })


const checkDepartmentNameExist = async (departmentName) => {
    try {
        const response = await adminDepSocket
            .emitWithAck('register:validate-phone-number', phone)
        return response.code
    } catch (error) {
        return 5000
    }
};

export {
    authSocket,
    checkDepartmentNameExist
};
