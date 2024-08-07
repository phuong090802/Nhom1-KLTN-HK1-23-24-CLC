import axios from 'axios';
import Cookies from 'js-cookie';
import { DataContext } from '../store';
import { initUser } from '../store/constance';

const setUser = DataContext.Provider._context._currentValue.setUser;

let isRefreshing = false;

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/`;

const API = axios.create({
  baseURL,
});

API.interceptors.response.use(
  (response) => {
    return response.data;
  },

  async (error) => {
    const originalRequest = error.config;
    const refreshTokenCode = [4015, 4018, 4017];
    if (
      !isRefreshing &&
      error?.response?.status === 401 &&
      refreshTokenCode.includes(error.response.data.code) &&
      !originalRequest._retry
    ) {
      isRefreshing = true;
      originalRequest._retry = true;
      try {
        console.log('interceptor refresh token');
        const response = await axios.post(
          `${baseURL}auth/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );
        const token = response.data.token;
        // console.log('API.interceptors.response.use', token);
        Cookies.set('accessToken', token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return API(originalRequest);
      } catch (refreshError) {
        // console.error('refreshError', refreshError);
        setUser(initUser);
        // Cookies.remove('accessToken');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error?.response?.data || error?.response);
  }
);

export default API;
