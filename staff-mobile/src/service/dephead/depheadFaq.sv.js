import { createHeader } from "../../util/service.util";
import API from "../api";

export const depheadGetFaqSv = async (params) => {
  const header = await createHeader(["author"]);
  return API.get("department-head/faqs", {
    headers: header,
    params: params,
  });
};

export const depheadAddFaqSv = async () => {
  const header = await createHeader(["author", "formData"]);
  return API.post("department-head/faqs", data, {
    headers: header,
  });
};

export const depheadDeleteFaqSv = async (faqId) => {
  const header = await createHeader(["author"]);
  return API.delete(`department-head/faqs/${faqId}`, {
    headers: header,
  });
};
