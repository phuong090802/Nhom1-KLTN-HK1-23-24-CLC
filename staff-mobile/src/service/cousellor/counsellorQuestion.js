import { createHeader } from "../../util/service.util";
import API from "../api";

export const counsellorGetQUestionsSv = async (params) => {
  const header = await createHeader(["author"]);
  return API.get("counsellor/questions", {
    headers: header,
    params: params,
  });
};
