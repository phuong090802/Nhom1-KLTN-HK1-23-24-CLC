import { createHeader } from "../../util/service.util";
import API from "../api";

export const counsellorGetFields = async () => {
  const header = await createHeader(["author"]);
  return API.get("counsellor/fields", {
    headers: header,
  });
};
