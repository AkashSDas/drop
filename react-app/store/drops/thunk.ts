import { normalizeDrops } from "lib/normalize/drop";
import toast from "react-hot-toast";
import fetchDropsPaginatedService from "services/drop/fetch-drops-paginated";
import deleteAndCreateReactionService, { IDeleteAndCreateReactionConfig } from "services/reaction/delete-and-create-reaction";
import reactOnDropService from "services/reaction/react-on-drop";
import unReactDropService from "services/reaction/unreact-drop";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { changeReactionToNew, updateReactionUpdateStatus } from "./slice";
import { IReactOnDrop, IUnReactOnDrop } from "./types";

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

export const updateDropReaction = createAsyncThunk(
  "drops/updateReaction",
  async (
    config: { newReaction: string; oldReaction: string; dropId: string },
    { dispatch, getState }
  ) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    dispatch(
      changeReactionToNew({
        dropId: config.dropId,
        reaction: {
          countUpdated: false,
          newReaction: config.newReaction,
          oldReaction: config.oldReaction,
          newReactionId: "",
        },
      })
    );

    dispatch(
      updateReactionUpdateStatus({ dropId: config.dropId, status: true })
    );

    const response = await deleteAndCreateReactionService({
      dropId: config.dropId,
      reaction: config.newReaction,
      token,
    });

    dispatch(
      updateReactionUpdateStatus({ dropId: config.dropId, status: false })
    );

    if (response.isError) {
      toast.error(response.msg);
      return;
    }

    const newReaction = response.data.reaction;
    dispatch(
      changeReactionToNew({
        dropId: config.dropId,
        reaction: {
          countUpdated: true,
          newReaction: newReaction.reaction,
          oldReaction: config.oldReaction,
          newReactionId: newReaction.id,
        },
      })
    );
  }
);

export const reactOnDrop = createAsyncThunk(
  "drops/reactOnDrop",
  async (config: IReactOnDrop, { dispatch, getState }) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    dispatch(
      changeReactionToNew({
        dropId: config.dropId,
        reaction: {
          countUpdated: false,
          newReaction: config.newReaction,
          oldReaction: "",
          newReactionId: "",
        },
      })
    );

    dispatch(
      updateReactionUpdateStatus({ dropId: config.dropId, status: true })
    );

    const response = await reactOnDropService(
      token,
      config.dropId,
      config.newReaction
    );

    dispatch(
      updateReactionUpdateStatus({ dropId: config.dropId, status: false })
    );

    if (response.isError) {
      toast.error(response.msg);
      return;
    }

    const newReaction = response.data.reaction;
    dispatch(
      changeReactionToNew({
        dropId: config.dropId,
        reaction: {
          countUpdated: true,
          newReaction: newReaction.reaction,
          oldReaction: "",
          newReactionId: newReaction.id,
        },
      })
    );
  }
);

export const unReactOnDrop = createAsyncThunk(
  "drops/unReactOnDrop",
  async (config: IUnReactOnDrop, { dispatch, getState }) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    dispatch(
      changeReactionToNew({
        dropId: config.dropId,
        reaction: {
          countUpdated: false,
          newReaction: "",
          oldReaction: config.oldReaction,
          newReactionId: "",
        },
      })
    );

    dispatch(
      updateReactionUpdateStatus({ dropId: config.dropId, status: true })
    );

    await unReactDropService(token, config.dropId);

    dispatch(
      updateReactionUpdateStatus({ dropId: config.dropId, status: false })
    );

    dispatch(
      changeReactionToNew({
        dropId: config.dropId,
        reaction: {
          countUpdated: true,
          newReaction: "",
          oldReaction: config.oldReaction,
          newReactionId: null,
        },
      })
    );
  }
);

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
