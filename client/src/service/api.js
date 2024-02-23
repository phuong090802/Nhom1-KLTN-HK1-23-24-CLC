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
        const originalRequest = error.config;
        if (error?.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await refreshToken();
                const token = response.data?.token;
                Cookies.remove('accessToken')
                Cookies.set('accessToken', token)
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return API(originalRequest);
            } catch (refreshError) {
                console.error(refreshError);
                Cookies.remove('userInfor')
                Cookies.remove('accessToken')
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

export default API