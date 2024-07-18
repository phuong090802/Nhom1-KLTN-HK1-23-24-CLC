import API from "../api.sv";
import { authorHeader, createHeader } from "../serviceHeader";

const updateProfileSv = (data) => {
  return API.put("users", data, {
    headers: authorHeader(),
  });
};

const passwordChangeSv = (data) => {
  return API.put("auth/password", data, {
    headers: authorHeader(),
  });
};

const verifyOtpSv = (data) => {
  return API.post("auth/verify-email", data, {
    headers: authorHeader(),
  });
};

const requestVerifySv = (data) => {
  console.log(data);
  return API.post("auth/validate-email", data, {
    headers: authorHeader(),
  });
};

const changeAvatarSv = (data) => {
  return API.patch("users", data, {
    headers: createHeader(["authorization", "formDataType"]),
  });
};

export {
  changeAvatarSv, passwordChangeSv, requestVerifySv, updateProfileSv, verifyOtpSv
};
