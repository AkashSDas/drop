import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import confirmPasswordReset, {
  IConfirmPasswordReset,
} from "lib/service/confirm-password-reset";
import toast from "react-hot-toast";

interface ConfirmPasswordResetState {
  loading: boolean;
}

const initialState: ConfirmPasswordResetState = {
  loading: false,
};

export const confirmPasswordResetSlice = createSlice({
  name: "confirmPasswordReset",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = confirmPasswordResetSlice.actions;
export default confirmPasswordResetSlice.reducer;

// Thunks

export const confirmPasswordResetThunk = createAsyncThunk(
  "confirmPasswordReset/user",
  async (data: IConfirmPasswordReset, { dispatch }) => {
    dispatch(setLoading(true));
    const response = await confirmPasswordReset(data);
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
