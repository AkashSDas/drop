import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  loading: boolean;
}

const initialState: LoginState = {
  loading: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export default loginSlice.reducer;
