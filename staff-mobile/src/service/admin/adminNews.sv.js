import { createHeader } from "../../util/service.util";
import API from "../api";

export const getNewsSv = async (params) => {
  return API.get("news", {
    params: params,
  });
};

export const addNewsSv = async (data) => {
  const header = await createHeader(["author", "formData"]);
  return API.post("admin/news", data, {
    headers: header,
  });
};
