import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveUserToLocalStorage } from "lib/base/local-storage";
import toast from "react-hot-toast";
import signupService, { ISignupData } from "services/auth/signup";
import { IUserState, updateUser } from "store/user/slice";
import { updateLoading } from "./slice";

export const signupThunk = createAsyncThunk(
  "signup/user",
  async (data: ISignupData, { dispatch }) => {
    dispatch(updateLoading(true));
    const response = await signupService(data);
    dispatch(updateLoading(false));
    if (response.isError) toast.error(response.msg);
    else {
      toast.success(response.msg);
      const user: IUserState = {
        token: response.data.token,
        info: {
          createdAt: response.data.user.createdAt,
          email: response.data.user.email,
          id: response.data.user.id,
          profilePic: response.data.user.profilePic,
          role: response.data.user.role,
          updatedAt: response.data.user.updatedAt,
          username: response.data.user.username,
        },
      };
      saveUserToLocalStorage(user);
      dispatch(updateUser(user));
      return true;
    }
    return false;
  }
);
