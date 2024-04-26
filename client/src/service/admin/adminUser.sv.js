import API from "../api.sv";
import { authorHeader } from "../serviceHeader";

const getUsersSv = (params) => {
  return API.get("admin/users", {
    headers: authorHeader(),
    params: params
  });
};

const updateUserStatusSv = (userId, data) => {
  return API.put(`admin/users/${userId}`, data, {
    headers: authorHeader(),
  });
};

export { getUsersSv, updateUserStatusSv };
