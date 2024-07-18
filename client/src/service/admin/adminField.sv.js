import API from "../api.sv";
import { authorHeader } from "../serviceHeader";

const getGeneralFieldSv = (params) => {
  return API.get("admin/general-fields", {
    headers: authorHeader(),
    params,
  });
};

const addGeneralFieldSv = (data) => {
  return API.post("admin/general-fields", data, {
    headers: authorHeader(),
  });
};

const updateFieldStatusSv = (id, data) => {
  return API.patch(`admin/general-fields/${id}`, data, {
    headers: authorHeader(),
  });
};

export { getGeneralFieldSv, addGeneralFieldSv, updateFieldStatusSv };
