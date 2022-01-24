import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import confirmPasswordResetService, {
  IConfirmPasswordResetData,
} from "services/auth/confirm-password-reset";
import { updateLoading } from "./slice";

export const confirmPasswordResetThunk = createAsyncThunk(
  "confirmPasswordReset/user",
  async (data: IConfirmPasswordResetData, { dispatch }) => {
    dispatch(updateLoading(true));
    const response = await confirmPasswordResetService(data);
    dispatch(updateLoading(false));
    if (response.isError) toast.error(response.msg);
    else {
      toast.success(response.msg);
      return true;
    }
    return false;
  }
);
