import { createSlice } from "@reduxjs/toolkit";

import { forgotPassword } from "./thunk";

interface IForgotPasswordState {
  isLoading: boolean;
}

const initialState: IForgotPasswordState = {
  isLoading: false,
};

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(forgotPassword.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, _) => {
      state.isLoading = false;
    });
    builder.addCase(forgotPassword.rejected, (state, _) => {
      state.isLoading = false;
    });
  },
});

export default forgotPasswordSlice.reducer;
