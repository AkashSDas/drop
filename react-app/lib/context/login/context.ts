import { createContext, Dispatch } from "react";
import { ILoginState } from ".";
import { LoginAction } from "./action";

interface ILoginContext {
  user: ILoginState;
  dispatch: Dispatch<LoginAction>;
}

export const LoginContext = createContext<ILoginContext>(null);
