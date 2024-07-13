import API from "../api";

const getFaqsSv = (params) => {
  return API.get("faqs", {
    params: params,
  });
};
export { getFaqsSv };
