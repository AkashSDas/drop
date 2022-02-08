import { normalizeDrop } from "lib/normalize/drop";
import toast from "react-hot-toast";
import fetchDropService from "services/drop/fetch-drop";
import deleteAndCreateReactionService from "services/reaction/delete-and-create-reaction";
import reactOnDropService from "services/reaction/react-on-drop";
import unReactDropService from "services/reaction/unreact-drop";
import { IReactOnDrop, IUnReactOnDrop } from "store/drops/types";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { updateReactionChangeStatus, updateReactionToNew } from "./slice";

export const fetchDrop = createAsyncThunk(
  "drop/fetchDrop",
  async (dropId: string, { getState }) => {
    const userId = (getState() as any).user.info.id;
    const response = await fetchDropService({ userId, dropId });
    if (response.isError) {
      toast.error(response.msg);
      return;
    }
    const drop = normalizeDrop(response.data);
    return drop;
  }
);

export const updateDropReaction = createAsyncThunk(
  "drop/updateReaction",
  async (
    config: { newReaction: string; oldReaction: string },
    { dispatch, getState }
  ) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    const dropId = (getState() as any).drop.drop.id;
    dispatch(
      updateReactionToNew({
        dropId,
        reaction: {
          countUpdated: false,
          newReaction: config.newReaction,
          oldReaction: config.oldReaction,
          newReactionId: "",
        },
      })
    );

    dispatch(updateReactionChangeStatus(true));
    const response = await deleteAndCreateReactionService({
      dropId,
      reaction: config.newReaction,
      token,
    });
    dispatch(updateReactionChangeStatus(false));

    if (response.isError) {
      toast.error(response.msg);
      return;
    }

    const newReaction = response.data.reaction;
    dispatch(
      updateReactionToNew({
        dropId,
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
  "drop/reactOnDrop",
  async (config: IReactOnDrop, { dispatch, getState }) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    dispatch(
      updateReactionToNew({
        dropId: config.dropId,
        reaction: {
          countUpdated: false,
          newReaction: config.newReaction,
          oldReaction: "",
          newReactionId: "",
        },
      })
    );

    dispatch(updateReactionChangeStatus(true));
    const response = await reactOnDropService(
      token,
      config.dropId,
      config.newReaction
    );
    dispatch(updateReactionChangeStatus(false));

    if (response.isError) {
      toast.error(response.msg);
      return;
    }

    const newReaction = response.data.reaction;
    dispatch(
      updateReactionToNew({
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
  "drop/unReactOnDrop",
  async (config: IUnReactOnDrop, { dispatch, getState }) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    dispatch(
      updateReactionToNew({
        dropId: config.dropId,
        reaction: {
          countUpdated: false,
          newReaction: "",
          oldReaction: config.oldReaction,
          newReactionId: "",
        },
      })
    );

    dispatch(updateReactionChangeStatus(true));
    await unReactDropService(token, config.dropId);
    dispatch(updateReactionChangeStatus(false));

    dispatch(
      updateReactionToNew({
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
