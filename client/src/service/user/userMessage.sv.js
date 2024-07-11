import API from "../api.sv";
import { authorHeader } from "../serviceHeader";

const getConversationsSv = () => {
  return API.get("conversations", {
    headers: authorHeader(),
  });
};

const getMessagesSv = (conversationId, params) => {
  return API.get(`conversations/${conversationId}?size=10&skip=10`, {
    headers: authorHeader(),
    params: params,
  });
};

export { getConversationsSv, getMessagesSv };
