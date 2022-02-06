import { saveUserToLocalStorage } from "lib/base/local-storage";
import { normalizeUserForStore } from "lib/normalize/user";
import toast from "react-hot-toast";
import signupService, { ISignupData } from "services/auth/signup";
import { updateUser } from "store/user/slice";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  "signup/createUser",
  async (data: ISignupData, { dispatch }) => {
    const response = await signupService(data);
    if (response.isError) toast.error(response.msg);
    else {
      toast.success(response.msg);
      const user = normalizeUserForStore(response.data);
      saveUserToLocalStorage(user);
      dispatch(updateUser(user));
      return true;
    }
    return false;
  }
);
