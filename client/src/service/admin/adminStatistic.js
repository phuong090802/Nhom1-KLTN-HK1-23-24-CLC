import API from "../api.sv";
import { authorHeader } from "../serviceHeader";

const getStatisticSv = () => {
  return API.get("statistics", {
    headers: authorHeader(),
  });
};

const getQuestionStatisticSv = (data) => {
  return API.post("admin/statistics/question", data, {
    headers: authorHeader(),
  });
};

const getDepartmentStatisticSv = ({ params }) => {
  return API.get("admin/statistics/department", {
    headers: authorHeader(),
    params: params,
  });
};

export { getStatisticSv, getQuestionStatisticSv, getDepartmentStatisticSv };
