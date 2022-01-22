import { IConfirmResetPasswordState } from ".";
import { ConfirmResetPasswordAction, SET_LOADING } from "./action";

const confirmResetPasswordReducer = (
  state: IConfirmResetPasswordState,
  action: ConfirmResetPasswordAction
): IConfirmResetPasswordState => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.playload };
    default:
      return state;
  }
};

export default confirmResetPasswordReducer;
