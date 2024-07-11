import { createHeader } from "../../util/service.util";
import API from "../api";

export const adminGetUsersSv = async (params) => {
  const header = await createHeader(["author"]);
  return API.get("admin/users", {
    headers: header,
    params: params,
  });
};

export const updateUserStatusSv = async (userId, data) => {
  const header = await createHeader(["author"]);
  return API.put(`admin/users/${userId}`, data, {
    headers: header,
  });
};

export const addUserSv = async (data) => {
  const header = await createHeader(["author"]);
  return API.post("admin/staffs", data, {
    headers: header,
  });
};
