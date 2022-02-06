import toast from "react-hot-toast";
import deleteCommentService from "services/comment/delete-comment";
import fetchDropCommentsPaginatedService from "services/comment/fetch-drop-comments";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { IComment, initAdd, removeComment, updateActionLoading, updateLoading, updateMoreCommentsInfo } from "./slice";

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

export const deleteCommentThunk = createAsyncThunk(
  "dropComments/deleteComment",
  async (commentId: string, { dispatch, getState }) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    dispatch(updateActionLoading(true));
    const response = await deleteCommentService({ commentId, token });
    dispatch(updateActionLoading(false));

    if (response.isError) toast.error(response.msg);
    else {
      toast.success(response.msg);
      dispatch(removeComment({ commentId }));
    }
  }
);
