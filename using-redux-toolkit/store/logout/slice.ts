import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILogoutState {
  loading: boolean;
}

const initialState: ILogoutState = {
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
