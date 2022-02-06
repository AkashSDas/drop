import { IComment } from "store/drop-comments/slice";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICommentState {
  loading: boolean;
  comment: IComment;
  actionLoading: boolean;
}

const initialState: ICommentState = {
  loading: false,
  actionLoading: false,
  comment: {
    id: null,
    dropId: null,
    content: null,
    createdAt: null,
    updatedAt: null,
    user: {
      id: null,
      email: null,
      username: null,
      profilePic: { id: null, URL: null },
      role: null,
      createdAt: null,
      updatedAt: null,
    },
    commented: false,
  },
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateActionLoading: (state, action: PayloadAction<boolean>) => {
      state.actionLoading = action.payload;
    },
    updateComment: (state, action: PayloadAction<IComment>) => {
      state.comment = action.payload;
    },
  },
});

export const { updateLoading, updateComment } = commentSlice.actions;
export default commentSlice.reducer;
