import { IUserState } from "store/user/slice";

export const saveUserToLocalStorage = (data: IUserState) => {
  if (window !== undefined) localStorage.setItem("user", JSON.stringify(data));
};

export const getUserFromLocalStorage = () => {
  if (window !== undefined) return JSON.parse(localStorage.getItem("user"));
};

export const removeUserFromLocalStorage = () => {
  if (window !== undefined) return localStorage.removeItem("user");
};
