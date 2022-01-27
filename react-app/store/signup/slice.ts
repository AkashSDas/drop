import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISignupState {
  loading: boolean;
}

const initialState: ISignupState = {
  loading: false,
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { updateLoading } = signupSlice.actions;
export default signupSlice.reducer;
