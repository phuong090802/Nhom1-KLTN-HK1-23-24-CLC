import API from "../api";

const signUp = (data) => {
    return API.post('auth/register', data)
}
const signIn = (data) => {
    return API.post('auth/login', data)
}

export {
    signUp,
    signIn
}