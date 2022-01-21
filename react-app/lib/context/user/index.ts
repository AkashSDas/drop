import { createContext, Dispatch } from "react";
import { UserAction } from "./action.types";

export interface IUserState {
  id: string;
  username: string;
  email: string;
  profilePicURL: {
    id: string;
    URL: string;
  };
  active: boolean;
  role: "member" | "elder" | "co-leader" | "leader";
}

export const userInitialState = {
  id: null,
  username: null,
  email: null,
  profilePicURL: null,
  active: null,
  role: null,
};

interface IUserContext {
  user: IUserState;
  dispatch: Dispatch<UserAction>;
}

export const UserContext = createContext<IUserContext>(null);
