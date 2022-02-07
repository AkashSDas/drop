import toast from "react-hot-toast";
import forgotPasswordService, { IForgotPasswordData } from "services/auth/forgot-password";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const forgotPassword = createAsyncThunk(
  "forgotPassword/resetForgotPassword",
  async (data: IForgotPasswordData, { dispatch }) => {
    const response = await forgotPasswordService(data);
    if (response.isError) toast.error(response.msg);
    else {
      toast.success(response.msg);
      return true;
    }
    return false;
  }
);
