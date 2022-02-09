import { normalizeDrops } from "lib/normalize/drop";
import toast from "react-hot-toast";
import fetchDropsPaginatedService from "services/drop/fetch-drops-paginated";
import deleteAndCreateReactionService from "services/reaction/delete-and-create-reaction";
import reactOnDropService from "services/reaction/react-on-drop";
import unReactDropService from "services/reaction/unreact-drop";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { changeReactionToNew, updateReactionUpdateStatus } from "./slice";
import { IReactOnDrop, IUnReactOnDrop } from "./types";

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
