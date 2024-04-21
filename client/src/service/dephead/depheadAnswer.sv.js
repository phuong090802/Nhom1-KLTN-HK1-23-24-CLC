import API from "../api.sv";
import { authorHeader } from "../serviceHeader";

const getWaitingQuestionsSv = (params) => {
  return API.get("department-head/questions", {
    headers: authorHeader(),
    params: params,
  });
};

export { getWaitingQuestionsSv };
