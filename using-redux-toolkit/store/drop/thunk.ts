import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import fetchDropsPaginatedService from "services/drop/fetch-drops-paginated";
import { initAdd, IDrop, updateLoading, updateMoreDropsInfo } from "./slice";

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
