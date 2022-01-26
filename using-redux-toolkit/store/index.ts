import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";

import userReducer from "store/user/slice";
import signupReducer from "store/signup/slice";
import loginReducer from "store/login/slice";
import logoutReducer from "store/logout/slice";
import forgotPasswordReducer from "store/forgot-password/slice";
import confirmPasswordResetReducer from "store/confirm-password-reset/slice";
import dropsReducer from "store/drops/slice";
import createDropFormReducer from "store/create-drop-form/slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    signup: signupReducer,
    login: loginReducer,
    logout: logoutReducer,
    forgotPassword: forgotPasswordReducer,
    confirmPasswordReset: confirmPasswordResetReducer,
    drops: dropsReducer,
    createDropForm: createDropFormReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;
