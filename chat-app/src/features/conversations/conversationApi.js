import axiosInstance from "../../api/intercepter.js";
import { create_group_URL, create_private_URL } from "../../api/api.js";

const user = JSON.parse(localStorage.getItem("user"));

export const createGroupConversation = (data) => {
  return axiosInstance.post(create_group_URL, data, {
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  });
};

export const createPrivateConversation = (data) => {
  return axiosInstance.post(create_private_URL, data, {
    headers: {
      authorization: `Bearer ${user.token}`,
    },
  });
};
