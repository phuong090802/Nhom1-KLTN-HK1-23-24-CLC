import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const refreshTokenCode = [4015, 4018, 4017];

const API = axios.create({
  // baseURL: process.env.EXPO_PUBLIC_LOCAL_API_URL,
  baseURL: process.env.EXPO_PUBLIC_HOST_API_URL,
  timeout: 10000,
});

API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      refreshTokenCode.includes(error.response?.data.code) &&
      !originalRequest._retry
    ) {
      console.log("get new Token");
      originalRequest._retry = true;
      try {
        const response = await API.post(
          "auth/refresh-token",
          {},
          { withCredentials: true }
        );
        const token = response.token;
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.setItem("accessToken", token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return API(originalRequest);
      } catch (refreshError) {
        AsyncStorage.clear();
        console.log("get new Token Fail");
        return Promise.reject(refreshError);
      }
    }
    // console.log(error.response.data);
    return Promise.reject(error.response?.data);
  }
);

export default API;
