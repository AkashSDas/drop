import { createSlice } from "@reduxjs/toolkit";

import { signup } from "./thunk";

interface ISignupState {
  isLoading: boolean;
}

const initialState: ISignupState = { isLoading: false };

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(signup.fulfilled, (state, _) => {
      state.isLoading = false;
    });
    builder.addCase(signup.rejected, (state, _) => {
      state.isLoading = false;
    });
  },
});

export default signupSlice.reducer;
