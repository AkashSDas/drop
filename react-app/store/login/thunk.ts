import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveUserToLocalStorage } from "lib/base/local-storage";
import toast from "react-hot-toast";
import loginService, { ILoginData } from "services/auth/login";
import { IUserState, updateUser } from "store/user/slice";
import { updateLoading } from "./slice";

export const loginThunk = createAsyncThunk(
  "login/user",
  async (data: ILoginData, { dispatch }) => {
    dispatch(updateLoading(true));
    const response = await loginService(data);
    dispatch(updateLoading(false));
    if (response.isError) toast.error(response.msg);
    else {
      toast.success(response.msg);
      const user: IUserState = {
        token: response.data.token,
        info: response.data.user,
      };
      saveUserToLocalStorage(user);
      dispatch(updateUser(user));
      return true;
    }
    return false;
  }
);
