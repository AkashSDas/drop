import { createContext, Dispatch } from "react";
import { IConfirmResetPasswordState } from ".";
import { ConfirmResetPasswordAction } from "./action";

interface IConfirmResetPasswordContext {
  confirmResetPassword: IConfirmResetPasswordState;
  dispatch: Dispatch<ConfirmResetPasswordAction>;
}

export const ForgotPasswordContext =
  createContext<IConfirmResetPasswordContext>(null);
