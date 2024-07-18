import API from "../api";
import { authHeader } from "../requestHeader";

const getNotificationsSv = async () => {
  const header = await authHeader();
  return API.get("user/notifications", {
    headers: header,
    params: {size:10}
  });
};

export { getNotificationsSv };
