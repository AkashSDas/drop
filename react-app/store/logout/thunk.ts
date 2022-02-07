import { removeUserFromLocalStorage } from "lib/base/local-storage";
import toast from "react-hot-toast";
import logoutService from "services/auth/logout";
import { updateUser, userSlice } from "store/user/slice";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const logout = createAsyncThunk(
  "logout/logoutUser",
  async (_, { dispatch }) => {
    const response = await logoutService();
    if (response.isError) toast.error(response.msg);
    else {
      toast.success(response.msg);
      removeUserFromLocalStorage();
      dispatch(updateUser(userSlice.getInitialState()));
      return true;
    }
    return false;
  }
);
