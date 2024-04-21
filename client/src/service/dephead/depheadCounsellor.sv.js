import API from "../api.sv";
import { authorHeader } from "../serviceHeader";

const depheadGetCounsellorsSv = (params) => {
  return API.get("department-head/counsellors", {
    headers: authorHeader(),
    params: params,
  });
};

const depheadAddCounsellorSv = (data) => {
  return API.post("department-head/counsellors", data, {
    headers: authorHeader(),
  });
};

const depheadUpdateCounsellorStatusSv = (counsellorId, data) => {
  return API.patch(`department-head/counsellors/${counsellorId}`, data, {
    headers: authorHeader(),
  });
};

export {
  depheadGetCounsellorsSv,
  depheadAddCounsellorSv,
  depheadUpdateCounsellorStatusSv,
};
