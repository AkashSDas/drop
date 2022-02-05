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
