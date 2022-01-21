export const saveUserToLocalStorage = (data) => {
  if (window !== undefined) localStorage.setItem("user", data);
};

export const getUserFromLocalStorage = () => {
  if (window !== undefined) return localStorage.getItem("user");
};
