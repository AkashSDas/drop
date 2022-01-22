import { ISignupState } from ".";
import { SignupAction, SET_LOADING } from "./action";

const signupReducer = (
  state: ISignupState,
  action: SignupAction
): ISignupState => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.playload };
    default:
      return state;
  }
};

export default signupReducer;
