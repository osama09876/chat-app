import axios from "axios";
import { login_URL, logout_URL, register_URL } from "../../api/api.js";

export const registerAPI = (data) => {
  return axios.post(register_URL, data);
};

export const loginAPI = (data) => {
  return axios.post(login_URL, data);
};

export const logoutAPI = (data) => {
  return axios.get(logout_URL);
};
