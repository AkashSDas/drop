import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import signup, { ISignupData } from "lib/service/signup";
import toast from "react-hot-toast";

interface SignupState {
  loading: boolean;
}

const initialState: SignupState = {
  loading: false,
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = signupSlice.actions;
export default signupSlice.reducer;

// Thunks

export const signupUser = createAsyncThunk(
  "signup/user",
  async (data: ISignupData, { dispatch }) => {
    dispatch(setLoading(true));
    const response = await signup(data);
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
