import { changeDropReactionCount } from "lib/store/drops";
import { IChangeReactionToNew, IDrop, IReaction } from "store/drops/types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchDrop } from "./thunk";

interface IDropState {
  drop: IDrop;
  isLoading: boolean;
}

const initialState: IDropState = {
  isLoading: false,
  drop: null,
};

export const dropSlice = createSlice({
  name: "drop",
  initialState,
  reducers: {
    updateReactionToNew: (
      state,
      action: PayloadAction<IChangeReactionToNew>
    ) => {
      const reaction = action.payload.reaction;
      if (!reaction.countUpdated) {
        state.drop.reactions = changeDropReactionCount(
          state.drop,
          reaction.oldReaction,
          reaction.newReaction
        );
      }

      state.drop.reacted =
        reaction.newReactionId !== null
          ? {
              id: reaction.newReactionId,
              reaction: reaction.newReaction,
            }
          : null;
    },
    updateReactionChangeStatus: (state, action: PayloadAction<boolean>) => {
      state.drop.updatingReaction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDrop.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDrop.fulfilled, (state, action) => {
      state.isLoading = false;
      const payload = action.payload;
      if (payload) state.drop = payload;
    });
    builder.addCase(fetchDrop.rejected, (state, _) => {
      state.isLoading = false;
    });
  },
});

export const { updateReactionToNew, updateReactionChangeStatus } =
  dropSlice.actions;

export default dropSlice.reducer;
