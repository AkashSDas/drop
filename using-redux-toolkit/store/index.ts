import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import loginReducer from "./login/slice";
import userReducer from "./user/slice";
import signupReducer from "./signup/slice";
import forgotPasswordReducer from "./forgot-password/slice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    signup: signupReducer,
    forgotPassword: forgotPasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;
