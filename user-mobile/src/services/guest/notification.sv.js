import API from "../api";
import { authHeader } from "../requestHeader";

const getNotificationsSv = async () => {
  const header = await authHeader();
  return API.get("user/notifications", {
    headers: header,
    params: { size: 10 },
  });
};

const getConversationByIdSv = async (id, params) => {
  const header = await authHeader();
  return API.get(`conversations/${id}?size=10&skip=10`, {
    headers: header,
    params,
  });
};

export { getNotificationsSv, getConversationByIdSv };
