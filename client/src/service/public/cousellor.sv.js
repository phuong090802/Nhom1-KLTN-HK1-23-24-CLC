import API from "../api.sv";

const getCounsellorListSv = (params) => {
  return API.get("departments/staff", {
    params: params,
  });
};

export { getCounsellorListSv };
