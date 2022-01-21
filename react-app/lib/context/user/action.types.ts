import { IUserState } from ".";

export const SET_USER = "SET_USER";

// Types

interface ISetUser {
  type: "SET_USER";
  playload: IUserState;
}

export type UserAction = ISetUser;
