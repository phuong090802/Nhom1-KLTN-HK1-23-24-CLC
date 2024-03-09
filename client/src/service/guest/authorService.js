import Cookies from "js-cookie";
import API from "../api";
import { authorHeader } from "../header";

const signUp = (data) => {
    return API.post('auth/register', data)
}
const signIn = (data) => {
    return API.post('auth/login', data, {
        withCredentials: true
    })
}

const refreshToken = () => {
    return API.post('auth/refresh-token', {}, {
        withCredentials: true
    })
}

const logoutSv = () => {
    return API.post('auth/logout', {}, {
        withCredentials: true
    })
}

const getMeSv = () => {
    return API.get('/auth/me', {
        headers: authorHeader()
    })
}

export {
    signUp,
    signIn,
    refreshToken,
    logoutSv,
    getMeSv
}