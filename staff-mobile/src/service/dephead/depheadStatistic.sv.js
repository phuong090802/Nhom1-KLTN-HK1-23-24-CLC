import { createHeader } from "../../util/service.util";
import API from "../api";

export const depheadGetQuestionStatistic = async () => {
  const header = await createHeader(["author"]);
  return API.post(
    "department-head/statistics/question",
    {
      timeUnit: "month", //year
      latestTime: 4,
    },
    {
      headers: header,
    }
  );
};

export const depheadGetFaqCount = async () => {
  const header = await createHeader(["author"]);
  return API.get("department-head/statistics/faq", { headers: header });
};
export const depheadGetCounsellorCount = async () => {
  const header = await createHeader(["author"]);
  return API.get("department-head/statistics/counsellor", { headers: header });
};
