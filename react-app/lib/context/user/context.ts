import { createContext, Dispatch } from "react";
import { IUserState } from ".";
import { UserAction } from "./action";

interface IUserContext {
  user: IUserState;
  dispatch: Dispatch<UserAction>;
}

export const UserContext = createContext<IUserContext>(null);
