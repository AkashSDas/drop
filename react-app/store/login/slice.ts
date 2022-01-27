import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILoginState {
  loading: boolean;
}

const initialState: ILoginState = {
  loading: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { updateLoading } = loginSlice.actions;
export default loginSlice.reducer;
