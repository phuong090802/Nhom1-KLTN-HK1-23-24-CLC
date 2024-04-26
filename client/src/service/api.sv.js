import axios from "axios";
import Cookies from "js-cookie";
import { DataContext } from "../store";
import { initUser } from "../store/constance";
import { refreshTokenSv } from "./public/auth.sv";

const refreshTokenCode = [4015, 4018, 4017];

const setUser = DataContext.Provider._context._currentValue.setUser;

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // baseURL: import.meta.env.VITE_API_HOST_URL,
});

API.interceptors.response.use(
  (response) => {
    return response.data;
  },

  async (error) => {
    const originalRequest = error.config;
    if (
      error?.response?.status === 401 &&
      refreshTokenCode.includes(error.response.data.code) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const response = await refreshTokenSv();
        const token = response.token;
        Cookies.set("accessToken", token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error("refreshError",refreshError);
        setUser(initUser);
        Cookies.remove("accessToken");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error.response.data);
  }
);

export default API;
