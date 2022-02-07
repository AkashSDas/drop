import toast from "react-hot-toast";
import confirmPasswordResetService, { IConfirmPasswordResetData } from "services/auth/confirm-password-reset";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const confirmPasswordReset = createAsyncThunk(
  "confirmPasswordReset/resetPassword",
  async (data: IConfirmPasswordResetData, { dispatch }) => {
    const response = await confirmPasswordResetService(data);
    if (response.isError) toast.error(response.msg);
    else {
      toast.success(response.msg);
      return true;
    }
    return false;
  }
);
