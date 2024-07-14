import API from "../api.sv";
import { authorHeader } from "../serviceHeader";

const getQuestionsSv = (params) => {
  return API.get("questions", {
    params: params,
    headers: authorHeader(),
  });
};

const increaseViewSv = (id) => {
  return API.put(`questions/${id}`);
};

export { getQuestionsSv, increaseViewSv };
