import Cookies from "js-cookie";

const jsonHeader = { "Content-Type": "application/json" };
const authorHeader = () => {
  if (Cookies.get("accessToken") === undefined) {
    return null;
  } else return { authorization: `Bearer ${Cookies.get("accessToken")}` };
};

const createHeader = (configs) => {
  const token = `Bearer ${Cookies.get("accessToken")}`;
  const headers = {
    authorization: { authorization: token },
    formDataType: { "Content-Type": "multipart/form-data" },
  };
  let retHeader = {};
  configs.map((config) => {
    retHeader = { ...retHeader, ...headers[config] };
  });
  return retHeader;
};

export { jsonHeader, authorHeader, createHeader };
