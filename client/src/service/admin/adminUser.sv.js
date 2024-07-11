import API from "../api.sv";
import { authorHeader, createHeader } from "../serviceHeader";

const getUsersSv = (params) => {
  return API.get("admin/users", {
    headers: authorHeader(),
    params: params,
  });
};

const updateUserStatusSv = (userId, data) => {
  return API.put(`admin/users/${userId}`, data, {
    headers: authorHeader(),
  });
};

const addStaffSv = (data) => {
  return API.post("admin/staffs", data, {
    headers: authorHeader(),
  });
};

const importStaffSv = (data) => {
  return API.post("admin/counsellors/upload", data, {
    headers: createHeader(["authorization", "formDataType"]),
  });
};

export { getUsersSv, updateUserStatusSv, addStaffSv, importStaffSv };
