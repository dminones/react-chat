import { disconnect } from "./chat";

export const getToken = () => {
  return localStorage.getItem("token") || false;
};

export const setToken = token => {
  if (token) {
    localStorage.setItem("token", token);
  }
};

export const logout = () => {
  console.log("LOGOUT");
  disconnect();
  setToken(null);
};
