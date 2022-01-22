import { ILoginState } from ".";
import { LoginAction, SET_LOADING } from "./action";

const loginReducer = (state: ILoginState, action: LoginAction): ILoginState => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.playload };
    default:
      return state;
  }
};

export default loginReducer;
