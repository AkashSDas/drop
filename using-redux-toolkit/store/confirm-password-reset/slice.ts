import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IConfirmPasswordResetState {
  loading: boolean;
}

const initialState: IConfirmPasswordResetState = {
  loading: false,
};

export const confirmPasswordResetSlice = createSlice({
  name: "confirmPasswordResetSlice",
  initialState,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { updateLoading } = confirmPasswordResetSlice.actions;
export default confirmPasswordResetSlice.reducer;
