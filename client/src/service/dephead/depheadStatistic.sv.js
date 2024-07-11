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

export {
  depheadGetUserCountSv,
  depheadGetFaqsCountSv,
  depheadGetQuestionStatisticSv,
  depheadGetFieldStatistic,
};
