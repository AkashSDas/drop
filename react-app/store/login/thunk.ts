import { saveUserToLocalStorage } from "lib/base/local-storage";
import { normalizeUserForStore } from "lib/normalize/user";
import toast from "react-hot-toast";
import loginService, { ILoginData } from "services/auth/login";
import { updateUser } from "store/user/slice";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "login/loginUser",
  async (data: ILoginData, { dispatch }) => {
    const response = await loginService(data);
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
