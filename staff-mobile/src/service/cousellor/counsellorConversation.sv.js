import { createHeader } from "../../util/service.util";
import API from "../api";

export const getConversationsSv = async () => {
  const header = await createHeader(["author"]);
  return API.get("conversations", {
    headers: header,
  });
};

export const getConversationDetailSv = async (conversationId) => {
  console.log(conversationId);
  const header = await createHeader(["author"]);
  return API.get(`conversations/${conversationId}`, {
    headers: header,
    params: { size: 10 },
  });
};
