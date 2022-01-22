import { IForgotPasswordState } from ".";
import { ForgotPasswordAction, SET_LOADING } from "./action";

const forgotPasswordReducer = (
  state: IForgotPasswordState,
  action: ForgotPasswordAction
): IForgotPasswordState => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.playload };
    default:
      return state;
  }
};

export default forgotPasswordReducer;
