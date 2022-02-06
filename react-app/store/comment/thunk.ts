import toast from "react-hot-toast";
import getCommentService from "services/comment/get-comment";
import updateCommentService from "services/comment/update-comment";
import { IComment, updateActionLoading } from "store/drop-comments/slice";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { updateComment, updateLoading } from "./slice";

export const fetchCommentThunk = createAsyncThunk(
  "comment/fetch",
  async (commentId: string, { dispatch }) => {
    dispatch(updateLoading(true));
    const response = await getCommentService(commentId);
    dispatch(updateLoading(false));
    if (response.isError) toast.error(response.msg);
    else {
      const comment = response.data.comment;
      const commented = false; // this is not needed so not getting it from backend

      const data: IComment = {
        id: comment.id,
        dropId: comment.drop,
        content: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        user: {
          id: comment.user.id,
          email: comment.user.email,
          username: comment.user.username,
          profilePic: comment.user.profilePic
            ? {
                id: comment.user.profilePic.id,
                URL: comment.user.profilePic.URL,
              }
            : {
                id: "",
                URL: "https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80",
              },
          role: comment.user.role,
          createdAt: comment.user.createdAt,
          updatedAt: comment.user.updatedAt,
        },
        commented: commented,
      };
      dispatch(updateComment(data));
    }
  }
);

export const updateCommentThunk = createAsyncThunk(
  "dropComment/updateComment",
  async (
    {
      content,
      dropId,
      commentId,
    }: { content: string; dropId: string; commentId: string },
    { dispatch, getState }
  ) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    dispatch(updateActionLoading(true));
    const response = await updateCommentService({
      content,
      dropId,
      token,
      commentId,
    });
    dispatch(updateActionLoading(false));

    if (response.isError) toast.error(response.msg);
    else toast.success(response.msg);
  }
);
