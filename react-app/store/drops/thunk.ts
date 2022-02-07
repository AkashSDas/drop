import { normalizeDrops } from "lib/normalize/drop";
import toast from "react-hot-toast";
import fetchDropsPaginatedService from "services/drop/fetch-drops-paginated";

import { createAsyncThunk } from "@reduxjs/toolkit";

// import { addDropReaction, initAdd, pushDrops, toggleDropReacted, unReactDropReaction, updateLoading, updateMoreDropsInfo, updateReactionLoading } from "./slice";

export const fetchInitialDrops = createAsyncThunk(
  "drops/fetchInitialDrops",
  async (limit: number, { getState }) => {
    const userId = (getState() as any).user.info.id;
    const response = await fetchDropsPaginatedService({ userId, limit });
    if (response.isError) {
      toast.error(response.msg);
      return;
    }
    const entities = normalizeDrops(response.data.drops);
    const ids = Object.keys(entities);
    return {
      entities,
      ids,
      next: response.data.next,
      hasNext: response.data.hasNext,
    };
  }
);

export const fetchMoreDrops = createAsyncThunk(
  "drops/fetchMoreDrops",
  async (limit: number, { getState }) => {
    const next = (getState() as any).drops.next;
    const userId = (getState() as any).user.info.id;
    const response = await fetchDropsPaginatedService({ userId, limit, next });
    if (response.isError) {
      toast.error(response.msg);
      return;
    }
    const entities = normalizeDrops(response.data.drops);
    const ids = Object.keys(entities);
    return {
      entities,
      ids,
      next: response.data.next,
      hasNext: response.data.hasNext,
    };
  }
);

// export const toggleReactionOnDropThunk = createAsyncThunk(
//   "drops/toggleReaction",
//   async (
//     {
//       dropId,
//       reaction,
//       oldReaction,
//     }: { dropId: string; reaction: string; oldReaction: string },
//     { dispatch, getState }
//   ) => {
//     const token = (getState() as any).user.token;
//     if (!token) {
//       toast.error("You are not logged in");
//       return;
//     }

//     dispatch(
//       toggleDropReacted({
//         dropId,
//         reaction: { reaction, id: "", oldReaction, countUpdated: false },
//       })
//     );

//     dispatch(updateReactionLoading(true));
//     const response = await toggleReactionOnDropService(token, dropId, reaction);
//     dispatch(updateReactionLoading(false));

//     // toggle drop of dropId reacted state to update
//     const newReaction = response.data.reaction;
//     dispatch(
//       toggleDropReacted({
//         dropId,
//         reaction: {
//           reaction: newReaction.reaction,
//           id: newReaction.id,
//           oldReaction,
//           countUpdated: true,
//         },
//       })
//     );
//   }
// );

// export const reactOnDropThunk = createAsyncThunk(
//   "drops/react",
//   async (
//     { dropId, reaction }: { dropId: string; reaction: string },
//     { dispatch, getState }
//   ) => {
//     const token = (getState() as any).user.token;
//     if (!token) {
//       toast.error("You are not logged in");
//       return;
//     }

//     dispatch(
//       addDropReaction({
//         dropId,
//         reaction: { reaction, id: "", countUpdated: false },
//       })
//     );

//     dispatch(updateReactionLoading(true));
//     const response = await reactOnDropService(token, dropId, reaction);
//     dispatch(updateReactionLoading(false));

//     // toggle drop of dropId reacted state to update
//     const newReaction = response.data.reaction;
//     dispatch(
//       addDropReaction({
//         dropId,
//         reaction: {
//           reaction: newReaction.reaction,
//           id: newReaction.id,
//           countUpdated: true,
//         },
//       })
//     );
//   }
// );

// export const unReactDropReactionThunk = createAsyncThunk(
//   "drops/unreact",
//   async (
//     { dropId, reaction }: { dropId: string; reaction: string },
//     { dispatch, getState }
//   ) => {
//     const token = (getState() as any).user.token;
//     if (!token) {
//       toast.error("You are not logged in");
//       return;
//     }

//     dispatch(
//       unReactDropReaction({
//         dropId,
//         reaction: { reaction, countUpdated: false },
//       })
//     );

//     dispatch(updateReactionLoading(true));
//     await unReactDropService(token, dropId);
//     dispatch(updateReactionLoading(false));

//     dispatch(
//       unReactDropReaction({
//         dropId,
//         reaction: { reaction, countUpdated: true },
//       })
//     );
//   }
// );

// export const fetchMoreDropsThunk = createAsyncThunk(
//   "drops/fetchMoreDrops",
//   async (_, { dispatch, getState }) => {
//     const userId = (getState() as any).user.info.id;
//     const next = (getState() as any).drops.next;
//     const limit = 4;
//     const response = await fetchDropsPaginatedService({ userId, next, limit });

//     if (response.isError) toast.error(response.msg);
//     else {
//       // transform drop
//       let drops: IDrop[] = [];
//       for (let i = 0; i < response.data.drops.length; i++) {
//         const drop = response.data.drops[i].drop;
//         const reactionsOnDrop = response.data.drops[i].reactionsOnDrop;
//         const reacted = response.data.drops[i].reacted;

//         let reactionsOnDropArr: {
//           name: string;
//           emoji: string;
//           count: number;
//         }[] = [];
//         for (const reaction in reactionsOnDrop) {
//           reactionsOnDropArr.push({
//             name: reactionsOnDrop[reaction].name,
//             emoji: reactionsOnDrop[reaction].emoji,
//             count: reactionsOnDrop[reaction].count,
//           });
//         }

//         drops.push({
//           id: drop.id,
//           content: drop.content,
//           createdAt: drop.createdAt,
//           updatedAt: drop.updatedAt,
//           user: {
//             id: drop.user.id,
//             email: drop.user.email,
//             username: drop.user.username,
//             profilePic: {
//               id: drop.user.profilePic.id,
//               URL: drop.user.profilePic.URL,
//             },
//             role: drop.user.role,
//             createdAt: drop.user.createdAt,
//             updatedAt: drop.user.updatedAt,
//           },
//           reactionsOnDrop: reactionsOnDropArr,
//           reacted: !reacted
//             ? null
//             : { reaction: reacted.reaction, id: reacted.id },
//         });
//       }

//       dispatch(
//         updateMoreDropsInfo({
//           next: response.data.next,
//           hasNext: response.data.hasNext,
//         })
//       );
//       dispatch(pushDrops(drops));
//     }
//   }
// );
