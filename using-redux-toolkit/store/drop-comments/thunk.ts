import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import fetchDropCommentsPaginatedService from "services/comment/fetch-drop-comments";
import {
  IComment,
  initAdd,
  updateLoading,
  updateMoreCommentsInfo,
} from "./slice";

export const fetchDropCommentsThunk = createAsyncThunk(
  "dropComments/commentsAdded",
  async (
    { dropId, init }: { dropId: string; init: boolean },
    { dispatch, getState }
  ) => {
    dispatch(updateLoading(true));

    const userId = (getState() as any).user.info.id;
    const next = (getState() as any).drops.next;
    const limit = 4;

    const response = await fetchDropCommentsPaginatedService(
      init ? { userId, limit, dropId } : { userId, next, limit, dropId }
    );

    dispatch(updateLoading(false));

    if (response.isError) toast.error(response.msg);
    else {
      // transform drop
      let comments: IComment[] = [];
      for (let i = 0; i < response.data.comments.length; i++) {
        const comment = response.data.comments[i].comment;
        const commented = response.data.comments[i].commented;

        comments.push({
          id: comment.id,
          dropId: comment.drop,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          user: {
            id: comment.user.id,
            email: comment.user.email,
            username: comment.user.username,
            profilePic: {
              id: comment.user.profilePic.id,
              URL: comment.user.profilePic.URL,
            },
            role: comment.user.role,
            createdAt: comment.user.createdAt,
            updatedAt: comment.user.updatedAt,
          },
          commented: commented,
        });
      }

      dispatch(
        updateMoreCommentsInfo({
          next: response.data.next,
          hasNext: response.data.hasNext,
        })
      );
      dispatch(initAdd(comments));
    }
  }
);
