import toast from "react-hot-toast";
import createCommentService from "services/comment/create-comment";
import { IComment, pushComments } from "store/drop-comments/slice";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { updateLoading } from "./slice";

export const createCommentThunk = createAsyncThunk(
  "createCommentForm/create",
  async (
    {
      token,
      content,
      dropId,
    }: { token: string; content: string; dropId: string },
    { dispatch }
  ) => {
    dispatch(updateLoading(true));
    const response = await createCommentService({ content, token, dropId });
    dispatch(updateLoading(false));

    if (response.isError) toast.error(response.msg);
    else {
      toast.success(response.msg);
      const comment = response.data.comment;
      const commented = response.data.commented;
      const newComment: IComment = {
        user: {
          id: comment.user.id,
          createdAt: comment.user.createdAt,
          email: comment.user.email,
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
          updatedAt: comment.user.updatedAt,
          username: comment.user.username,
        },
        commented: commented,
        content: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        dropId: comment.drop,
        id: comment.id,
      };

      dispatch(pushComments([newComment]));

      return true;
    }
    return false;
  }
);
