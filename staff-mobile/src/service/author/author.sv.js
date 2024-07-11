import { createHeader } from "../../util/service.util";
import API from "../api";

const loginSv = (data) => {
  return API.post("auth/login", data);
};

const getMeSv = async () => {
  const header = await createHeader(["author"]);
  return API.get("auth/me", {
    headers: header,
  });
};

const refreshTokenSv = () => {
  return API.post("auth/refresh-token", {}, { withCredentials: true });
};
export { loginSv, getMeSv };
