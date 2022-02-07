import { IAuthor } from "store/drops/types";
import { IUserState } from "store/user/slice";

export const normalizeUserForStore = (data: any): IUserState => {
  const user: IUserState = {
    token: data.token,
    info: {
      createdAt: data.user.createdAt,
      email: data.user.email,
      id: data.user.id,
      profilePic: data.user.profilePic,
      role: data.user.role,
      updatedAt: data.user.updatedAt,
      username: data.user.username,
    },
  };

  return user;
};

export const normalizeDropAuthor = (data: any): IAuthor => {
  const profilePic = data.profilePic
    ? {
        id: data.profilePic.id,
        URL: data.profilePic.URL,
      }
    : {
        id: "default",
        URL: "https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80",
      };

  return {
    id: data.id,
    email: data.email,
    username: data.username,
    role: data.role,
    profilePic,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};
