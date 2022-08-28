const jwt = require("jsonwebtoken");

export const readToken = () => {
  const tokenStr = localStorage.getItem("token");
  return tokenStr !== null ? JSON.parse(tokenStr) : null;
};
export const saveToken = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};
export const deleteToken = () => {
  localStorage.removeItem("token");
};

export const isTokenValid = () => {
  const tokenStr = localStorage.getItem("token");
  return jwt.verify(token);
};
