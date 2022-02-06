import toast from "react-hot-toast";
import fetchDropService from "services/drop/fetch-drop";
import reactOnDropService from "services/reaction/react-on-drop";
import toggleReactionOnDropService from "services/reaction/toggle-reaction";
import unReactDropService from "services/reaction/unreact-drop";
import { IDrop } from "store/drops/slice";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { addDropReaction, toggleDropReacted, unReactDropReaction, updateDrop, updateLoading, updateReactionLoading } from "./slice";

export const fetchDropThunk = createAsyncThunk(
  "drop/updateDrop",
  async (dropId: string, { dispatch, getState }) => {
    dispatch(updateLoading(true));
    const userId = (getState() as any).user.info.id;
    const response = await fetchDropService({ userId, dropId });
    dispatch(updateLoading(false));

    if (response.isError) toast.error(response.msg);
    else {
      // transform drop

      const drop = response.data.drop;
      const reactionsOnDrop = response.data.reactionsOnDrop;
      const reacted = response.data.reacted;

      let reactionsOnDropArr: {
        name: string;
        emoji: string;
        count: number;
      }[] = [];
      for (const reaction in reactionsOnDrop) {
        reactionsOnDropArr.push({
          name: reactionsOnDrop[reaction].name,
          emoji: reactionsOnDrop[reaction].emoji,
          count: reactionsOnDrop[reaction].count,
        });
      }

      const dropInfo: IDrop = {
        id: drop.id,
        content: drop.content,
        createdAt: drop.createdAt,
        updatedAt: drop.updatedAt,
        user: {
          id: drop.user.id,
          email: drop.user.email,
          username: drop.user.username,
          profilePic: {
            id: drop.user.profilePic.id,
            URL: drop.user.profilePic.URL,
          },
          role: drop.user.role,
          createdAt: drop.user.createdAt,
          updatedAt: drop.user.updatedAt,
        },
        reactionsOnDrop: reactionsOnDropArr,
        reacted: !reacted
          ? null
          : { reaction: reacted.reaction, id: reacted.id },
      };

      dispatch(updateDrop(dropInfo));
    }
  }
);

export const toggleReactionOnDropThunk = createAsyncThunk(
  "drop/toggleReaction",
  async (
    {
      dropId,
      reaction,
      oldReaction,
    }: { dropId: string; reaction: string; oldReaction: string },
    { dispatch, getState }
  ) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    dispatch(
      toggleDropReacted({
        reaction,
        id: "",
        oldReaction,
        countUpdated: false,
      })
    );

    dispatch(updateReactionLoading(true));
    const response = await toggleReactionOnDropService(token, dropId, reaction);
    dispatch(updateReactionLoading(false));

    // toggle drop of dropId reacted state to update
    const newReaction = response.data.reaction;
    dispatch(
      toggleDropReacted({
        reaction: newReaction.reaction,
        id: newReaction.id,
        oldReaction,
        countUpdated: true,
      })
    );
  }
);

export const reactOnDropThunk = createAsyncThunk(
  "drop/react",
  async (
    { dropId, reaction }: { dropId: string; reaction: string },
    { dispatch, getState }
  ) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    dispatch(
      addDropReaction({
        reaction,
        id: "",
        countUpdated: false,
      })
    );

    dispatch(updateReactionLoading(true));
    const response = await reactOnDropService(token, dropId, reaction);
    dispatch(updateReactionLoading(false));

    // toggle drop of dropId reacted state to update
    const newReaction = response.data.reaction;
    dispatch(
      addDropReaction({
        reaction: newReaction.reaction,
        id: newReaction.id,
        countUpdated: true,
      })
    );
  }
);

export const unReactDropReactionThunk = createAsyncThunk(
  "drop/unreact",
  async (
    { dropId, reaction }: { dropId: string; reaction: string },
    { dispatch, getState }
  ) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    dispatch(unReactDropReaction({ reaction, countUpdated: false }));
    dispatch(updateReactionLoading(true));
    await unReactDropService(token, dropId);
    dispatch(updateReactionLoading(false));
    dispatch(unReactDropReaction({ reaction, countUpdated: true }));
  }
);
