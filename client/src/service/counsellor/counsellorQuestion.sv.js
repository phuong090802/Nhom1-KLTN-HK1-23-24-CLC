import API from "../api.sv";
import { authorHeader } from "../serviceHeader";

const getQuestionsSv = (params) => {
  return API.get("counsellor/questions", {
    headers: authorHeader(),
    params: params,
  });
};

const forwardQuestionSv = (questionId, data) => {
  return API.put(`counsellor/questions/${questionId}`, data, {
    headers: authorHeader(),
  });
};

export { forwardQuestionSv, getQuestionsSv };
