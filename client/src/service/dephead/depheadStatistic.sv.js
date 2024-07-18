import API from "../api.sv";
import { authorHeader } from "../serviceHeader";

const depheadGetUserCountSv = () => {
  return API.get("department-head/statistics/counsellor", {
    headers: authorHeader(),
  });
};

const depheadGetFaqsCountSv = () => {
  return API.get("department-head/statistics/faq", { headers: authorHeader() });
};

const depheadGetQuestionStatisticSv = (data) => {
  return API.post("department-head/statistics/question", data, {
    headers: authorHeader(),
  });
};

const depheadGetFieldStatistic = () => {
  return API.get("department-head/statistics/field", {
    headers: authorHeader(),
  });
};

// Lấy danh sách số lượng câu hỏi quá hạn của tư vấn viên
const getOverDueQuestionCountSv = () => {
  return API.get("department-head/counsellors/reminder", {
    headers: authorHeader(),
  });
};

const getQuestionCountSv = () => {
  return API.get("department-head/statistics/question", {
    headers: authorHeader(),
  });
};

const getRankingCounsellorSv = () => {
  return API.get("department-head/statistics/counsellor/ranking", {
    headers: authorHeader(),
  });
};

export {
  depheadGetFaqsCountSv,
  depheadGetFieldStatistic,
  depheadGetQuestionStatisticSv,
  depheadGetUserCountSv,
  getOverDueQuestionCountSv,
  getRankingCounsellorSv,
  getQuestionCountSv
};
