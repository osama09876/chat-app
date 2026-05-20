import {
  all_users_URL,
  login_URL,
  logout_URL,
  register_URL,
} from "../../api/api.js";
import axiosInstance from "../../api/intercepter.js";
import axios from "axios";

export const registerAPI = (data) => {
  return axios.post(register_URL, data);
};

export const loginAPI = (data) => {
  return axios.post(login_URL, data);
};

const user = JSON.parse(localStorage.getItem("user"));
const token = user.token ?? null;
export const getAllUsersAPI = () => {
  return axios.get(all_users_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// console.log(user);

export const logoutAPI = () => {
  return axiosInstance.post(
    logout_URL,
    {},
    {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    },
  );
};
