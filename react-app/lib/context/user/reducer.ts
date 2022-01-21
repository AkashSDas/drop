import { IUserState } from ".";
import { SET_USER, UserAction } from "./action";

const userReducer = (state: IUserState, action: UserAction): IUserState => {
  switch (action.type) {
    case SET_USER:
      return { ...action.playload };
    default:
      return state;
  }
};

export default userReducer;
