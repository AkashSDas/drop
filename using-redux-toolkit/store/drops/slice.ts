import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IDrop {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    username: string;
    profilePic: { id: string; URL: string };
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  reactionsOnDrop: { name: string; emoji: string; count: number }[];
  reacted: null | { reaction: string; id: string };
}

interface IDropsState {
  loading: boolean;
  next: string | null;
  hasNext: boolean;
  drops: IDrop[];
  togglingReaction: boolean;
}

const initialState: IDropsState = {
  loading: false,
  next: null,
  hasNext: false,
  drops: [],
  togglingReaction: false,
};

export const dropsSlice = createSlice({
  name: "drops",
  initialState,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateMoreDropsInfo: (
      state,
      action: PayloadAction<{ next: string | null; hasNext: boolean }>
    ) => {
      state.hasNext = action.payload.hasNext;
      state.next = action.payload.next;
    },
    initAdd: (state, action: PayloadAction<IDrop[]>) => {
      state.drops = action.payload;
    },
    updateReactionLoading: (state, action: PayloadAction<boolean>) => {
      state.togglingReaction = action.payload;
    },
    toggleDropReacted: (
      state,
      action: PayloadAction<{
        reaction: {
          reaction: string;
          id: string;
          oldReaction: string;
          countUpdated: boolean;
        };
        dropId: string;
      }>
    ) => {
      const { reaction, dropId } = action.payload;

      let drops = [];
      for (let i = 0; i < state.drops.length; i++) {
        const drop = state.drops[i];
        if (drop.id === dropId) {
          // decrement count of old reaction & increment count of new reaction

          let reactionsOnDrop = [];
          if (!reaction.countUpdated) {
            for (let j = 0; j < drop.reactionsOnDrop.length; j++) {
              const reactionInfo = drop.reactionsOnDrop[j];
              if (reactionInfo.name === reaction.oldReaction) {
                reactionsOnDrop.push({
                  ...reactionInfo,
                  count: reactionInfo.count - 1,
                });
              } else if (reactionInfo.name === reaction.reaction) {
                reactionsOnDrop.push({
                  ...reactionInfo,
                  count: reactionInfo.count + 1,
                });
              } else {
                reactionsOnDrop.push(reactionInfo);
              }
            }
          }

          drops.push({
            ...drop,
            reacted: { id: reaction.id, reaction: reaction.reaction },
            reactionsOnDrop: !reaction.countUpdated
              ? reactionsOnDrop
              : drop.reactionsOnDrop,
          });
        } else {
          drops.push(drop);
        }
      }

      state.drops = drops;
    },
    addDropReaction: (
      state,
      action: PayloadAction<{
        reaction: {
          reaction: string;
          id: string;
          countUpdated: boolean;
        };
        dropId: string;
      }>
    ) => {
      const { reaction, dropId } = action.payload;

      let drops = [];
      for (let i = 0; i < state.drops.length; i++) {
        const drop = state.drops[i];
        if (drop.id === dropId) {
          // decrement count of old reaction & increment count of new reaction

          let reactionsOnDrop = [];
          if (!reaction.countUpdated) {
            for (let j = 0; j < drop.reactionsOnDrop.length; j++) {
              const reactionInfo = drop.reactionsOnDrop[j];
              if (reactionInfo.name === reaction.reaction) {
                reactionsOnDrop.push({
                  ...reactionInfo,
                  count: reactionInfo.count + 1,
                });
              } else {
                reactionsOnDrop.push(reactionInfo);
              }
            }
          }

          drops.push({
            ...drop,
            reacted: { id: reaction.id, reaction: reaction.reaction },
            reactionsOnDrop: !reaction.countUpdated
              ? reactionsOnDrop
              : drop.reactionsOnDrop,
          });
        } else {
          drops.push(drop);
        }
      }

      state.drops = drops;
    },
    unReactDropReaction: (
      state,
      action: PayloadAction<{
        reaction: {
          reaction: string;
          countUpdated: boolean;
        };
        dropId: string;
      }>
    ) => {
      const { reaction, dropId } = action.payload;

      let drops = [];
      for (let i = 0; i < state.drops.length; i++) {
        const drop = state.drops[i];
        if (drop.id === dropId) {
          // decrement count of old reaction & increment count of new reaction

          let reactionsOnDrop = [];
          if (!reaction.countUpdated) {
            for (let j = 0; j < drop.reactionsOnDrop.length; j++) {
              const reactionInfo = drop.reactionsOnDrop[j];
              if (reactionInfo.name === reaction.reaction) {
                reactionsOnDrop.push({
                  ...reactionInfo,
                  count: reactionInfo.count - 1,
                });
              } else {
                reactionsOnDrop.push(reactionInfo);
              }
            }
          }
          drops.push({
            ...drop,
            reacted: null,
            reactionsOnDrop: !reaction.countUpdated
              ? reactionsOnDrop
              : drop.reactionsOnDrop,
          });
        } else {
          drops.push(drop);
        }
      }

      state.drops = drops;
    },
    addDrop: (state, action: PayloadAction<IDrop>) => {
      state.drops = [action.payload, ...state.drops];
    },
    pushDrops: (state, action: PayloadAction<IDrop[]>) => {
      state.drops = [...state.drops, ...action.payload];
    },
  },
});

export const {
  updateLoading,
  initAdd,
  updateMoreDropsInfo,
  updateReactionLoading,
  toggleDropReacted,
  addDropReaction,
  unReactDropReaction,
  addDrop,
  pushDrops,
} = dropsSlice.actions;
export default dropsSlice.reducer;
