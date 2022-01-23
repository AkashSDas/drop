import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import resetForgotPassword, {
  IForgotPasswordData,
} from "lib/service/forgot-password";
import toast from "react-hot-toast";

interface ForgotPasswordState {
  loading: boolean;
}

const initialState: ForgotPasswordState = {
  loading: false,
};

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;

// Thunks

export const resetForgotPasswordThunk = createAsyncThunk(
  "forgotPassword/user",
  async (data: IForgotPasswordData, { dispatch }) => {
    dispatch(setLoading(true));
    const response = await resetForgotPassword(data);
    dispatch(setLoading(false));
    if (response.error) {
      toast.error(response.error.response.data.msg);
    } else {
      if (response.result.isError) {
        toast.error(response.result.data.msg);
      } else {
        toast.success(response.result.data.msg);
        return true;
      }
    }
    return false;
  }
);
