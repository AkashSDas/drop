import { createContext, Dispatch } from "react";
import { ISignupState } from ".";
import { SignupAction } from "./action";

interface ISignupContext {
  signup: ISignupState;
  dispatch: Dispatch<SignupAction>;
}

export const SignupContext = createContext<ISignupContext>(null);
