import { changeDropReactionCount } from "lib/store/drops";
import { IChangeReactionToNew, IDrop } from "store/drops/types";

import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchInitialProfileDrops, fetchMoreProfileDrops } from "./thunk";

export const profileDropsAdapter = createEntityAdapter<IDrop>();
const initialState = profileDropsAdapter.getInitialState({
  isLoading: false,
  next: null,
  hasNext: null,
});

export const profileDropsSlice = createSlice({
  name: "profileDrops",
  initialState,
  reducers: {
    changeProfileDropReactionToNew: (
      state,
      action: PayloadAction<IChangeReactionToNew>
    ) => {
      const payload = action.payload;
      const drop = state.entities[payload.dropId];
      if (!payload.reaction.countUpdated) {
        state.entities[payload.dropId].reactions = changeDropReactionCount(
          drop,
          payload.reaction.oldReaction,
          payload.reaction.newReaction
        );
      }
      state.entities[payload.dropId].reacted =
        payload.reaction.newReactionId !== null
          ? {
              id: payload.reaction.newReactionId,
              reaction: payload.reaction.newReaction,
            }
          : null;
    },
    updateProfileDropReactionUpdateStatus: (
      state,
      action: PayloadAction<{ status: boolean; dropId: string }>
    ) => {
      const payload = action.payload;
      state.entities[payload.dropId].updatingReaction = payload.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialProfileDrops.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(fetchInitialProfileDrops.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        const { entities, hasNext, ids, next } = action.payload;
        state.entities = entities;
        state.ids = ids;
        state.next = next;
        state.hasNext = hasNext;
      }
    });
    builder.addCase(fetchInitialProfileDrops.rejected, (state, _) => {
      state.isLoading = false;
    });
    builder.addCase(fetchMoreProfileDrops.fulfilled, (state, action) => {
      if (action.payload) {
        const { entities, ids, next, hasNext } = action.payload;
        state.entities = { ...state.entities, ...entities };
        state.ids = [...state.ids, ...ids];
        state.next = next;
        state.hasNext = hasNext;
      }
    });
  },
});

export const {
  changeProfileDropReactionToNew,
  updateProfileDropReactionUpdateStatus,
} = profileDropsSlice.actions;

export const { selectById: selectProfileDropById } =
  profileDropsAdapter.getSelectors();

export default profileDropsSlice.reducer;
