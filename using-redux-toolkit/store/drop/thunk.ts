import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import fetchDropService from "services/drop/fetch-drop";
import { IDrop } from "store/drops/slice";
import { updateDrop, updateLoading } from "./slice";

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
