import { removeUserFromLocalStorage } from "lib/base/local-storage";
import toast from "react-hot-toast";
import logoutService from "services/auth/logout";
import { updateUser, userSlice } from "store/user/slice";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { updateLoading } from "./slice";

export const logoutThunk = createAsyncThunk(
  "logout/user",
  async (_, { dispatch }) => {
    dispatch(updateLoading(true));
    const response = await logoutService();
    dispatch(updateLoading(false));
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
