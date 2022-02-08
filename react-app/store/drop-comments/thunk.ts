import { normalizeComment, normalizeComments } from "lib/normalize/comments";
import toast from "react-hot-toast";
import createCommentService from "services/comment/create-comment";
import deleteCommentService from "services/comment/delete-comment";
import fetchDropCommentsPaginatedService from "services/comment/fetch-drop-comments";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { updateIsDeletingStatus } from "./slice";

export const fetchInitialComments = createAsyncThunk(
  "dropComments/fetchInitialComments",
  async (
    { limit, dropId }: { limit: number; dropId: string },
    { getState }
  ) => {
    const userId = (getState() as any).user.info.id;
    const response = await fetchDropCommentsPaginatedService({
      dropId,
      limit,
      userId,
    });
    if (response.isError) {
      toast.error(response.msg);
      return;
    }
    const entities = normalizeComments(response.data.comments);
    const ids = Object.keys(entities);
    return {
      entities,
      ids,
      next: response.data.next,
      hasNext: response.data.hasNext,
    };
  }
);

export const fetchMoreComments = createAsyncThunk(
  "dropComments/fetchMoreComments",
  async (
    { limit, dropId }: { limit: number; dropId: string },
    { getState }
  ) => {
    const next = (getState() as any).drops.next;
    const userId = (getState() as any).user.info.id;
    const response = await fetchDropCommentsPaginatedService({
      dropId,
      limit,
      userId,
    });
    if (response.isError) {
      toast.error(response.msg);
      return;
    }
    const entities = normalizeComments(response.data);
    const ids = Object.keys(entities);
    return {
      entities,
      ids,
      next: response.data.next,
      hasNext: response.data.hasNext,
    };
  }
);

export const deleteComment = createAsyncThunk(
  "dropComments/deleteComment",
  async (commentId: string, { getState }) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return { isDeleted: false, commentId };
    }

    updateIsDeletingStatus({ commentId, status: true });
    const response = await deleteCommentService({ commentId, token });
    updateIsDeletingStatus({ commentId, status: false });
    if (response.isError) {
      toast.error(response.msg);
      return { isDeleted: false, commentId };
    }

    toast.success(response.msg);
    return { isDeleted: true, commentId };
  }
);

export const createComment = createAsyncThunk(
  "dropComments/createComment",
  async (payload: { content: string; dropId: string }, { getState }) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return { isCreated: false, comment: null };
    }

    const { content, dropId } = payload;
    const response = await createCommentService({ content, token, dropId });
    if (response.isError) {
      toast.error(response.msg);
      return { isCreated: false, comment: null };
    }

    toast.success(response.msg);
    const comment = normalizeComment(response.data);
    return { isCreated: true, comment };
  }
);
