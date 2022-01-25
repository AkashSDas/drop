import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import createDropService, { ICreateDropData } from "services/drop/create-drop";
import { addDrop } from "store/drop/slice";
import { updateLoading } from "./slice";

export const createDropThunk = createAsyncThunk(
  "createDropForm/create",
  async (
    { token, data }: { token: string; data: ICreateDropData },
    { dispatch }
  ) => {
    dispatch(updateLoading(true));
    const response = await createDropService(token, data);
    dispatch(updateLoading(false));
    if (response.isError) toast.error(response.msg);
    else {
      toast.success(response.msg);
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

      dispatch(
        addDrop({
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
          reacted,
          reactionsOnDrop: reactionsOnDropArr,
        })
      );

      return true;
    }
    return false;
  }
);
