import API from "../api";

const signUp = (data) => {
    return API.post('auth/register', data)
}
const signIn = (data) => {
    return API.post('auth/login', data)
}

const refreshToken = () => {
    return API.post('auth/refresh-token', {}, {
        withCredentials: true
    })
}

export {
    signUp,
    signIn,
    refreshToken
}