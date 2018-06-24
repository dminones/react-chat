export const getToken = () => {
  return localStorage.getItem("token") || false;
};

export const setToken = token => {
  if (token) {
    localStorage.setItem("token", token);
  }
};
