import { createContext, Dispatch } from "react";
import { IForgotPasswordState } from ".";
import { ForgotPasswordAction } from "./action";

interface IForgotPasswordContext {
  forgotPassword: IForgotPasswordState;
  dispatch: Dispatch<ForgotPasswordAction>;
}

export const ForgotPasswordContext =
  createContext<IForgotPasswordContext>(null);
