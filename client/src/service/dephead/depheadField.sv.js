import API from "../api.sv";
import { authorHeader } from "../serviceHeader";

const depheadGetFieldsSv = (params) => {
  return API.get("department-head/fields", {
    headers: authorHeader(),
    params: params,
  });
};

const depheadUpdateFieldStatusSv = (fieldId, data) => {
  return API.patch(`department-head/fields/${fieldId}`, data, {
    headers: authorHeader(),
  });
};


export { depheadGetFieldsSv, depheadUpdateFieldStatusSv };
