import axios from "axios";
import { refreshToken } from "./guest/authorService";
import Cookies from 'js-cookie'

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

API.interceptors.response.use(
    (response) => {
        return response.data
    },

    async (error) => {
        console.log(error.response.data);
        const originalRequest = error.config;
        if (error?.response?.status === 401
            && error?.response?.data?.code !== 4008
            && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                Cookies.remove('accessToken')
                const response = await refreshToken();
                const token = response.token;
                Cookies.set('accessToken', token)
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return API(originalRequest);
            } catch (refreshError) {
                console.error(refreshError);
                Cookies.remove('userInfor')
                Cookies.remove('accessToken')
                return Promise.reject(refreshError.response);
            }
        }
        return Promise.reject(error.response.data);
    }
)

export default API