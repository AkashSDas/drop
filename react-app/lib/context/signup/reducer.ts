import { ISignupState } from ".";
import { SignupAction, SET_DATA, SET_ERROR, SET_LOADING } from "./action";

const signupReducer = (
  state: ISignupState,
  action: SignupAction
): ISignupState => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.playload };
    case SET_ERROR:
      return { ...state, error: action.playload };
    case SET_DATA:
      return { ...state, data: action.playload };
    default:
      return state;
  }
};

export default signupReducer;
