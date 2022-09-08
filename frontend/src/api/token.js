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
  try {
    const tokenStr = localStorage.getItem("token");
    const expiry = JSON.parse(atob(tokenStr.split(".")[1])).exp;
    return Math.floor(new Date().getTime() / 1000) <= expiry;
  } catch (e) {
    console.log("not valid");
    return false;
  }
};
