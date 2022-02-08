import { changeDropReactionCount } from "lib/store/drops";

import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchInitialDrops, fetchMoreDrops, updateDropReaction } from "./thunk";
import { IChangeReactionToNew, IDrop } from "./types";

export const dropsAdapter = createEntityAdapter<IDrop>();
const initialState = dropsAdapter.getInitialState({
  isLoading: false,
  next: null,
  hasNext: false,
});

export const dropsSlice = createSlice({
  name: "drop",
  initialState,
  reducers: {
    changeReactionToNew: (
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
    updateReactionUpdateStatus: (
      state,
      action: PayloadAction<{ status: boolean; dropId: string }>
    ) => {
      const payload = action.payload;
      state.entities[payload.dropId].updatingReaction = payload.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialDrops.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(fetchInitialDrops.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        const { entities, hasNext, ids, next } = action.payload;
        state.entities = entities;
        state.ids = ids;
        state.next = next;
        state.hasNext = hasNext;
      }
    });
    builder.addCase(fetchInitialDrops.rejected, (state, _) => {
      state.isLoading = false;
    });
    builder.addCase(fetchMoreDrops.fulfilled, (state, action) => {
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

export const { changeReactionToNew, updateReactionUpdateStatus } =
  dropsSlice.actions;

export default dropsSlice.reducer;
