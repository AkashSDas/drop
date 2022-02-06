import { IDrop } from "store/drops/slice";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IDropState {
  loading: boolean;
  drop: IDrop;
  togglingReaction: boolean;
}

const initialState: IDropState = {
  loading: false,
  drop: null,
  togglingReaction: false,
};

export const dropSlice = createSlice({
  name: "drop",
  initialState,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateReactionLoading: (state, action: PayloadAction<boolean>) => {
      state.togglingReaction = action.payload;
    },
    updateDrop: (state, action: PayloadAction<IDrop>) => {
      state.drop = action.payload;
    },
    toggleDropReacted: (
      state,
      action: PayloadAction<{
        reaction: string;
        id: string;
        oldReaction: string;
        countUpdated: boolean;
      }>
    ) => {
      const { reaction, id, oldReaction, countUpdated } = action.payload;

      // decrement count of old reaction & increment count of new reaction
      let reactionsOnDrop = [];
      if (!countUpdated) {
        for (let j = 0; j < state.drop.reactionsOnDrop.length; j++) {
          const reactionInfo = state.drop.reactionsOnDrop[j];
          if (reactionInfo.name === oldReaction) {
            reactionsOnDrop.push({
              ...reactionInfo,
              count: reactionInfo.count - 1,
            });
          } else if (reactionInfo.name === reaction) {
            reactionsOnDrop.push({
              ...reactionInfo,
              count: reactionInfo.count + 1,
            });
          } else {
            reactionsOnDrop.push(reactionInfo);
          }
        }
      }

      const newDrop: IDrop = {
        ...state.drop,
        reacted: { id, reaction },
        reactionsOnDrop: !countUpdated
          ? reactionsOnDrop
          : state.drop.reactionsOnDrop,
      };
      state.drop = newDrop;
    },
    addDropReaction: (
      state,
      action: PayloadAction<{
        reaction: string;
        id: string;
        countUpdated: boolean;
      }>
    ) => {
      const { reaction, id, countUpdated } = action.payload;

      const drop = state.drop;
      // decrement count of old reaction & increment count of new reaction

      let reactionsOnDrop = [];
      if (!countUpdated) {
        for (let j = 0; j < drop.reactionsOnDrop.length; j++) {
          const reactionInfo = drop.reactionsOnDrop[j];
          if (reactionInfo.name === reaction) {
            reactionsOnDrop.push({
              ...reactionInfo,
              count: reactionInfo.count + 1,
            });
          } else {
            reactionsOnDrop.push(reactionInfo);
          }
        }
      }

      state.drop = {
        ...drop,
        reacted: { id, reaction },
        reactionsOnDrop: !countUpdated ? reactionsOnDrop : drop.reactionsOnDrop,
      };
    },
    unReactDropReaction: (
      state,
      action: PayloadAction<{
        reaction: string;
        countUpdated: boolean;
      }>
    ) => {
      const { reaction, countUpdated } = action.payload;
      const drop = state.drop;
      // decrement count of old reaction & increment count of new reaction

      let reactionsOnDrop = [];
      if (!countUpdated) {
        for (let j = 0; j < drop.reactionsOnDrop.length; j++) {
          const reactionInfo = drop.reactionsOnDrop[j];
          if (reactionInfo.name === reaction) {
            reactionsOnDrop.push({
              ...reactionInfo,
              count: reactionInfo.count - 1,
            });
          } else {
            reactionsOnDrop.push(reactionInfo);
          }
        }
      }

      state.drop = {
        ...drop,
        reacted: null,
        reactionsOnDrop: !countUpdated ? reactionsOnDrop : drop.reactionsOnDrop,
      };
    },
  },
});

export const {
  updateDrop,
  updateLoading,
  unReactDropReaction,
  toggleDropReacted,
  addDropReaction,
  updateReactionLoading,
} = dropSlice.actions;
export default dropSlice.reducer;
