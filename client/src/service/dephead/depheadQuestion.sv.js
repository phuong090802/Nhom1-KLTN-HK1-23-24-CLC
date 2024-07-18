import API from "../api.sv";
import { authorHeader } from "../serviceHeader";

export const getCounsellorToAssignSv = () => {
  return API.get("department-head/counsellors/assign-work", {
    headers: authorHeader(),
  });
};

