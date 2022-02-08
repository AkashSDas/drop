import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { createComment, deleteComment, fetchInitialComments, fetchMoreComments } from "./thunk";
import { IComment } from "./types";

export const dropCommentsAdapter = createEntityAdapter<IComment>();
const initialState = dropCommentsAdapter.getInitialState({
  isLoading: false,
  next: null,
  hasNext: false,
});

export const dropCommentsSlice = createSlice({
  name: "dropComments",
  initialState,
  reducers: {
    updateIsDeletingStatus: (
      state,
      action: PayloadAction<{ status: boolean; commentId: string }>
    ) => {
      const payload = action.payload;
      state.entities[payload.commentId].isDeleting = payload.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialComments.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(fetchInitialComments.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        const { entities, hasNext, ids, next } = action.payload;
        state.entities = entities;
        state.ids = ids;
        state.next = next;
        state.hasNext = hasNext;
      }
    });
    builder.addCase(fetchInitialComments.rejected, (state, _) => {
      state.isLoading = false;
    });
    builder.addCase(fetchMoreComments.fulfilled, (state, action) => {
      if (action.payload) {
        const { entities, ids, next, hasNext } = action.payload;
        state.entities = { ...state.entities, ...entities };
        state.ids = [...state.ids, ...ids];
        state.next = next;
        state.hasNext = hasNext;
      }
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const payload = action.payload;
      if (payload.isDeleted) {
        dropCommentsAdapter.removeOne(state, payload.commentId);
      }
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      const payload = action.payload;
      if (payload.isCreated) {
        state.entities = {
          [payload.comment.id]: payload.comment,
          ...state.entities,
        };
        state.ids = [payload.comment.id, ...state.ids];
      }
    });
  },
});

export const { updateIsDeletingStatus } = dropCommentsSlice.actions;

export const {
  selectById: selectCommentById,
  selectAll: selectAllDropComments,
} = dropCommentsAdapter.getSelectors();

export default dropCommentsSlice.reducer;
