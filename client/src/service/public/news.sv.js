import API from "../api.sv";

const getNewsSv = (params) => {
  return API.get("news", {
    params: params,
  });
};

export { getNewsSv };
