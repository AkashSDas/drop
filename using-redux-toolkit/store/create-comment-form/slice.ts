import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICreateCommentState {
  loading: boolean;
}

const initialState: ICreateCommentState = {
  loading: false,
};

export const createCommentSlice = createSlice({
  name: "createCommentForm",
  initialState,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { updateLoading } = createCommentSlice.actions;
export default createCommentSlice.reducer;
