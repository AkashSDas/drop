export const saveUserToLocalStorage = (data) => {
  if (window !== undefined) localStorage.setItem("user", JSON.stringify(data));
};

export const getUserFromLocalStorage = () => {
  if (window !== undefined) return JSON.parse(localStorage.getItem("user"));
};

export const removeUserFromLocalStorage = () => {
  if (window !== undefined) return localStorage.removeItem("user");
};
