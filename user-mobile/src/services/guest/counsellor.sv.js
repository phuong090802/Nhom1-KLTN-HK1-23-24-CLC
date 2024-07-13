import API from "../api";

const getCounsellorListSv = (params) => {
  return API.get("departments/staff", {
    params: params,
  });
};

export { getCounsellorListSv };
