import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import forgotPasswordService, {
  IForgotPasswordData,
} from "services/auth/forgot-password";
import { updateLoading } from "./slice";

export const forgotPasswordThunk = createAsyncThunk(
  "forgotPassword/user",
  async (data: IForgotPasswordData, { dispatch }) => {
    dispatch(updateLoading(true));
    const response = await forgotPasswordService(data);
    dispatch(updateLoading(false));
    if (response.isError) toast.error(response.msg);
    else {
      toast.success(response.msg);
      return true;
    }
    return false;
  }
);
