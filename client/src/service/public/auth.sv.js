import API from "../api.sv";
import { authorHeader } from "../serviceHeader";

const loginSv = (data) => {
  return API.post("auth/login", data, {
    withCredentials: true,
  });
};

const registerSv = (data) => {
  return API.post("auth/register", data, {});
};

const getMeSv = () => {
  return API.get("/auth/me", {
    headers: authorHeader(),
  });
};

const refreshTokenSv = () => {
  return API.post(
    "auth/refresh-token",
    {},
    {
      withCredentials: true,
    }
  );
};

const logoutSv = () => {
  return API.post(
    "auth/logout",
    {},
    {
      withCredentials: true,
    }
  );
};

const forgotPasswordSv = (data) => {
  return API.post("auth/forgot-password", data, {});
};

const OTPConfirmSv = (data) => {
  return API.post("auth/verify-otp", data, {});
};

const resetPasswordSv = (token, data) => {
  return API.post(`auth/reset-password/${token}`, data, {});
};

export {
  loginSv,
  getMeSv,
  refreshTokenSv,
  logoutSv,
  registerSv,
  forgotPasswordSv,
  OTPConfirmSv,
  resetPasswordSv,
};
