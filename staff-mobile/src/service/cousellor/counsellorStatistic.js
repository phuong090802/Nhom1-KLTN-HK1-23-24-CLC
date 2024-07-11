import { createHeader } from "../../util/service.util";
import API from "../api";

export const counsellorGetQuestionStatistic = async () => {
  const header = await createHeader(["author"]);
  return API.post(
    "counsellor/statistics/question",
    {
      timeUnit: "month", //year
      latestTime: 4,
    },
    {
      headers: header,
    }
  );
};
