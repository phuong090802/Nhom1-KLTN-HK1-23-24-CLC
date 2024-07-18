import API from "../api.sv";
import { authorHeader } from "../serviceHeader";

export const likeSv = (id) => {
  return API.post(
    `user/questions/${id}`,
    {},
    {
      headers: authorHeader(),
    }
  );
};

export const getQuestionHistorySv = (params) => {
  return API.get("user/questions", { headers: authorHeader(), params: params });
};

export const getLikeHistorySv = (params) => {
  return API.get("user/questions/liked", {
    headers: authorHeader(),
    params: params,
  });
};

export const getQuestionByIdSv = (id) => {
  // console.log('getQuestionByIdSv', id);
  return API.get(`/questions/${id}`);
};

export const ratingQuestionSv = (id, data) => {
  return API.put(`user/questions/${id}/rating`, data, {
    headers: authorHeader(),
  });
};
