export const readUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr !== null ? JSON.parse(userStr) : null;
};
export const saveUser = (user) => {
  if (readUser() != null) {
    deleteUser();
  }
  localStorage.setItem("user", JSON.stringify(user));
};
export const deleteUser = () => {
  localStorage.removeItem("user");
};
