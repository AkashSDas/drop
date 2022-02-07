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
      state.entities[payload.dropId].reacted = {
        id: payload.reaction.newReactionId,
        reaction: payload.reaction.newReaction,
      };
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

// export const dropsSlice = createSlice({
//   name: "drops",
//   initialState,
//   reducers: {
//     initAdd: (state, action: PayloadAction<IDrop[]>) => {
//       state.drops = action.payload;
//     },
//     updateReactionLoading: (state, action: PayloadAction<boolean>) => {
//       state.togglingReaction = action.payload;
//     },
//     addDropReaction: (
//       state,
//       action: PayloadAction<{
//         reaction: {
//           reaction: string;
//           id: string;
//           countUpdated: boolean;
//         };
//         dropId: string;
//       }>
//     ) => {
//       const { reaction, dropId } = action.payload;

//       let drops = [];
//       for (let i = 0; i < state.drops.length; i++) {
//         const drop = state.drops[i];
//         if (drop.id === dropId) {
//           // decrement count of old reaction & increment count of new reaction

//           let reactionsOnDrop = [];
//           if (!reaction.countUpdated) {
//             for (let j = 0; j < drop.reactionsOnDrop.length; j++) {
//               const reactionInfo = drop.reactionsOnDrop[j];
//               if (reactionInfo.name === reaction.reaction) {
//                 reactionsOnDrop.push({
//                   ...reactionInfo,
//                   count: reactionInfo.count + 1,
//                 });
//               } else {
//                 reactionsOnDrop.push(reactionInfo);
//               }
//             }
//           }

//           drops.push({
//             ...drop,
//             reacted: { id: reaction.id, reaction: reaction.reaction },
//             reactionsOnDrop: !reaction.countUpdated
//               ? reactionsOnDrop
//               : drop.reactionsOnDrop,
//           });
//         } else {
//           drops.push(drop);
//         }
//       }

//       state.drops = drops;
//     },
//     unReactDropReaction: (
//       state,
//       action: PayloadAction<{
//         reaction: {
//           reaction: string;
//           countUpdated: boolean;
//         };
//         dropId: string;
//       }>
//     ) => {
//       const { reaction, dropId } = action.payload;

//       let drops = [];
//       for (let i = 0; i < state.drops.length; i++) {
//         const drop = state.drops[i];
//         if (drop.id === dropId) {
//           // decrement count of old reaction & increment count of new reaction

//           let reactionsOnDrop = [];
//           if (!reaction.countUpdated) {
//             for (let j = 0; j < drop.reactionsOnDrop.length; j++) {
//               const reactionInfo = drop.reactionsOnDrop[j];
//               if (reactionInfo.name === reaction.reaction) {
//                 reactionsOnDrop.push({
//                   ...reactionInfo,
//                   count: reactionInfo.count - 1,
//                 });
//               } else {
//                 reactionsOnDrop.push(reactionInfo);
//               }
//             }
//           }
//           drops.push({
//             ...drop,
//             reacted: null,
//             reactionsOnDrop: !reaction.countUpdated
//               ? reactionsOnDrop
//               : drop.reactionsOnDrop,
//           });
//         } else {
//           drops.push(drop);
//         }
//       }

//       state.drops = drops;
//     },
//     addDrop: (state, action: PayloadAction<IDrop>) => {
//       state.drops = [action.payload, ...state.drops];
//     },
//     pushDrops: (state, action: PayloadAction<IDrop[]>) => {
//       state.drops = [...state.drops, ...action.payload];
//     },
//   },
// });

// export const {
//   updateLoading,
//   initAdd,
//   updateMoreDropsInfo,
//   updateReactionLoading,
//   toggleDropReacted,
//   addDropReaction,
//   unReactDropReaction,
//   addDrop,
//   pushDrops,
// } = dropsSlice.actions;
// export default dropsSlice.reducer;
