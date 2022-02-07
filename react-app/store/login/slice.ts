import { createSlice } from "@reduxjs/toolkit";

import { login } from "./thunk";

interface ILoginState {
  isLoading: boolean;
}

const initialState: ILoginState = { isLoading: false };

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, _) => {
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, _) => {
      state.isLoading = false;
    });
  },
});

export default loginSlice.reducer;
