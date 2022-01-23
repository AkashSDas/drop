import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LogoutState {
  loading: boolean;
}

const initialState: LogoutState = {
  loading: false,
};

export const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { updateLoading } = logoutSlice.actions;
export default logoutSlice.reducer;
