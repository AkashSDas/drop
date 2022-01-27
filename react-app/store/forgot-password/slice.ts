import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IForgotPasswordState {
  loading: boolean;
}

const initialState: IForgotPasswordState = {
  loading: false,
};

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { updateLoading } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
