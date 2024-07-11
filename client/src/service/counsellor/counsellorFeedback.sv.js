import API from "../api.sv";
import { authorHeader } from "../serviceHeader";

export const getFeedbacksSv = (params) => {
  return API.get("counsellor/feedbacks", {
    headers: authorHeader(),
    params: params,
  });
};

export const deleteFeedbackSv = (id) => {
  return API.delete(`counsellor/feedbacks/${id}`, { headers: authorHeader() });
};
