import { createHeader } from "../../util/service.util";
import API from "../api";

export const depheadGetWaitingAnswesSv = async (params) => {
  const header = await createHeader(["author"]);
  return API.get("department-head/questions", {
    headers: header,
    params: params,
  });
};

export const depheadAproveAnswer = async (answerId) => {
  const header = await createHeader(["author"]);
  return API.put(`department-head/questions/${answerId}`, {
    headers: header,
  });
};
