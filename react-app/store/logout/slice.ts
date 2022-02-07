import { createSlice } from "@reduxjs/toolkit";

import { logout } from "./thunk";

interface ILogoutState {
  isLoading: boolean;
}

const initialState: ILogoutState = { isLoading: false };

export const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, _) => {
      state.isLoading = false;
    });
    builder.addCase(logout.rejected, (state, _) => {
      state.isLoading = false;
    });
  },
});

export default logoutSlice.reducer;
