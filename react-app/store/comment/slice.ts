import { IComment } from "store/drop-comments/types";

import { createSlice } from "@reduxjs/toolkit";

import { fetchComment, updateComment } from "./thunk";

interface ICommentState {
  isLoading: boolean;
  comment: IComment;
  isUpdating: boolean;
}

const initialState: ICommentState = {
  isLoading: false,
  isUpdating: false,
  comment: {
    id: null,
    dropId: null,
    content: null,
    createdAt: null,
    updatedAt: null,
    hasCommented: null,
    isDeleting: false,
    user: {
      id: null,
      email: null,
      username: null,
      profilePic: { id: null, URL: null },
      role: null,
      createdAt: null,
      updatedAt: null,
    },
  },
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComment.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(fetchComment.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) state.comment = action.payload;
    });
    builder.addCase(fetchComment.rejected, (state, _) => {
      state.isLoading = false;
    });
    builder.addCase(updateComment.pending, (state, _) => {
      state.isUpdating = true;
    });
    builder.addCase(updateComment.fulfilled, (state) => {
      state.isUpdating = false;
    });
    builder.addCase(updateComment.rejected, (state, _) => {
      state.isUpdating = false;
    });
  },
});

export default commentSlice.reducer;
