import { createSlice } from "@reduxjs/toolkit";

import { confirmPasswordReset } from "./thunk";

interface IConfirmPasswordResetState {
  isLoading: boolean;
}

const initialState: IConfirmPasswordResetState = {
  isLoading: false,
};

export const confirmPasswordResetSlice = createSlice({
  name: "confirmPasswordResetSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(confirmPasswordReset.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(confirmPasswordReset.fulfilled, (state, _) => {
      state.isLoading = false;
    });
    builder.addCase(confirmPasswordReset.rejected, (state, _) => {
      state.isLoading = false;
    });
  },
});

export default confirmPasswordResetSlice.reducer;
