import API from "../api.sv";

const getQuestionsSv = (params) => {
  return API.get("questions", {
    params: params,
  });
};

export { getQuestionsSv };
