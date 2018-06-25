import { disconnect } from "./chat";

export const getToken = () => {
  return localStorage.getItem("token") || false;
};

const setToken = token => {
  if (token) {
    localStorage.setItem("token", token);
  }
};

export const logout = () => {
  console.log("LOGOUT");
  disconnect();
  localStorage.setItem("token", null);
};

export const login = (username, password) => {
  return fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `username=${username}&password=${password}`
  })
    .then(resp => {
      if (resp.status < 400) {
        return resp.json();
      }

      if (resp.status < 500) {
        return {
          error: "Sorry, you entered an incorrect username or password."
        };
      }

      return { error: "Ooops, can't connet to the server" };
    })
    .then(resp => {
      if (!resp.error) {
        setToken(resp.token);
        return { success: true };
      } else {
        return resp;
      }
    })
    .catch(error => ({
      error:
        "Oops can't connect to the server. Please verify your internet connection"
    }));
};
