import API from "../api.sv";
import { authorHeader } from "../serviceHeader";

export const getNotificationSv = () => {
  return API.get("user/notifications", {
    headers: authorHeader(),
  });
};
