import API from "../api.sv";
import { authorHeader } from "../serviceHeader";

const loginSv = (data) => {
  return API.post("auth/login", data, {
    withCredentials: true,
  });
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
  return API.post("auth/logout");
};

export { loginSv, getMeSv, refreshTokenSv, logoutSv };
