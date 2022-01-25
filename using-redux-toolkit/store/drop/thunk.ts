import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import fetchDropsPaginatedService from "services/drop/fetch-drops-paginated";
import reactOnDropService from "services/reaction/react-on-drop";
import toggleReactionOnDropService from "services/reaction/toggle-reaction";
import {
  initAdd,
  IDrop,
  updateLoading,
  updateMoreDropsInfo,
  updateReactionLoading,
  toggleDropReacted,
  addDropReaction,
} from "./slice";

export const fetchDropsThunk = createAsyncThunk(
  "drops/dropsAdded",
  async (init: boolean, { dispatch, getState }) => {
    dispatch(updateLoading(true));

    const userId = (getState() as any).user.info.id;
    const next = (getState() as any).drops.next;
    const limit = 10;

    const response = await fetchDropsPaginatedService(
      init ? { userId, limit } : { userId, next, limit }
    );

    dispatch(updateLoading(false));

    if (response.isError) toast.error(response.msg);
    else {
      // transform drop
      let drops: IDrop[] = [];
      for (let i = 0; i < response.data.drops.length; i++) {
        const drop = response.data.drops[i].drop;
        const reactionsOnDrop = response.data.drops[i].reactionsOnDrop;
        const reacted = response.data.drops[i].reacted;

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

        drops.push({
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
        });
      }

      dispatch(
        updateMoreDropsInfo({
          next: response.data.next,
          hasNext: response.data.hasNext,
        })
      );
      dispatch(initAdd(drops));
    }
  }
);

export const toggleReactionOnDropThunk = createAsyncThunk(
  "drops/toggleReaction",
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
        dropId,
        reaction: { reaction, id: "", oldReaction, countUpdated: false },
      })
    );

    dispatch(updateReactionLoading(true));
    const response = await toggleReactionOnDropService(token, dropId, reaction);
    dispatch(updateReactionLoading(false));

    // toggle drop of dropId reacted state to update
    const newReaction = response.data.reaction;
    dispatch(
      toggleDropReacted({
        dropId,
        reaction: {
          reaction: newReaction.reaction,
          id: newReaction.id,
          oldReaction,
          countUpdated: true,
        },
      })
    );
  }
);

export const reactOnDropThunk = createAsyncThunk(
  "drops/react",
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
        dropId,
        reaction: { reaction, id: "", countUpdated: false },
      })
    );

    dispatch(updateReactionLoading(true));
    const response = await reactOnDropService(token, dropId, reaction);
    dispatch(updateReactionLoading(false));

    // toggle drop of dropId reacted state to update
    const newReaction = response.data.reaction;
    dispatch(
      addDropReaction({
        dropId,
        reaction: {
          reaction: newReaction.reaction,
          id: newReaction.id,
          countUpdated: true,
        },
      })
    );
  }
);
