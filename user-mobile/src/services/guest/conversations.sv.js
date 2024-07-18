import API from "../api";
import { authHeader } from "../requestHeader";

const getConversationsSv = async () => {
  const header = await authHeader();
  return API.get("conversations", {
    headers: header,
    params: { size: 10 },
  });
};

export { getConversationsSv };
