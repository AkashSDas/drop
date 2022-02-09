import { normalizeDrops } from "lib/normalize/drop";
import toast from "react-hot-toast";
import fetchUserDropsPaginatedService from "services/profile/fetch-user-drops-paginated";
import deleteAndCreateReactionService from "services/reaction/delete-and-create-reaction";
import reactOnDropService from "services/reaction/react-on-drop";
import unReactDropService from "services/reaction/unreact-drop";
import { IReactOnDrop, IUnReactOnDrop } from "store/drops/types";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { changeProfileDropReactionToNew, updateProfileDropReactionUpdateStatus } from "./slice";

export const fetchInitialProfileDrops = createAsyncThunk(
  "profileDrops/fetchInitialDrops",
  async (payload: { limit: number; userId: string }, { getState }) => {
    const loggedInUserId = (getState() as any).user.info?.id;
    const response = await fetchUserDropsPaginatedService({
      userId: payload.userId,
      limit: payload.limit,
      selfUserId: loggedInUserId,
    });
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

export const fetchMoreProfileDrops = createAsyncThunk(
  "profileDrops/fetchMoreDrops",
  async (payload: { limit: number; userId: string }, { getState }) => {
    const next = (getState() as any).profileDrops.next;
    const loggedInUserId = (getState() as any).user.info?.id;
    const response = await fetchUserDropsPaginatedService({
      userId: payload.userId,
      limit: payload.limit,
      selfUserId: loggedInUserId,
      next,
    });
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

export const updateProfileDropReaction = createAsyncThunk(
  "profileDrops/updateReaction",
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
      changeProfileDropReactionToNew({
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
      updateProfileDropReactionUpdateStatus({
        dropId: config.dropId,
        status: true,
      })
    );

    const response = await deleteAndCreateReactionService({
      dropId: config.dropId,
      reaction: config.newReaction,
      token,
    });

    dispatch(
      updateProfileDropReactionUpdateStatus({
        dropId: config.dropId,
        status: false,
      })
    );

    if (response.isError) {
      toast.error(response.msg);
      return;
    }

    const newReaction = response.data.reaction;
    dispatch(
      changeProfileDropReactionToNew({
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
  "profileDrops/reactOnDrop",
  async (config: IReactOnDrop, { dispatch, getState }) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    dispatch(
      changeProfileDropReactionToNew({
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
      updateProfileDropReactionUpdateStatus({
        dropId: config.dropId,
        status: true,
      })
    );

    const response = await reactOnDropService(
      token,
      config.dropId,
      config.newReaction
    );

    dispatch(
      updateProfileDropReactionUpdateStatus({
        dropId: config.dropId,
        status: false,
      })
    );

    if (response.isError) {
      toast.error(response.msg);
      return;
    }

    const newReaction = response.data.reaction;
    dispatch(
      changeProfileDropReactionToNew({
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
  "profileDrops/unReactOnDrop",
  async (config: IUnReactOnDrop, { dispatch, getState }) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    dispatch(
      changeProfileDropReactionToNew({
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
      updateProfileDropReactionUpdateStatus({
        dropId: config.dropId,
        status: true,
      })
    );

    await unReactDropService(token, config.dropId);

    dispatch(
      updateProfileDropReactionUpdateStatus({
        dropId: config.dropId,
        status: false,
      })
    );

    dispatch(
      changeProfileDropReactionToNew({
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
