import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/`,
  timeout: 10000,
});

API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshTokenCode = [4015, 4018, 4017];
    if (
      error.response?.status === 401 &&
      refreshTokenCode.includes(error.response?.data.code) &&
      !originalRequest._retry
    ) {
      console.log('Get new Token');
      originalRequest._retry = true;
      try {
        const response = await API.post(
          'auth/refresh-token',
          {},
          { withCredentials: true }
        );
        const token = response.token;
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.setItem('accessToken', token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return API(originalRequest);
      } catch (refreshError) {
        AsyncStorage.clear();
        console.log('Get new Token Fail');
        return Promise.reject(refreshError);
      }
    }
    // console.log(error.response.data);
    return Promise.reject(error.response?.data);
  }
);

export default API;
