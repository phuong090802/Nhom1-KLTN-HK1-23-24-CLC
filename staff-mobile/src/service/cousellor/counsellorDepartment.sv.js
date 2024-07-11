import API from "../api";

export const getDepartmentSv = () => {
  return API.get("departments");
};
