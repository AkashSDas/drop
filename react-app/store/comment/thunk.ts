import { normalizeComment } from "lib/normalize/comments";
import toast from "react-hot-toast";
import getCommentService from "services/comment/get-comment";
import updateCommentService from "services/comment/update-comment";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchComment = createAsyncThunk(
  "comment/fetchComment",
  async (commentId: string) => {
    const response = await getCommentService(commentId);
    if (response.isError) {
      toast.error(response.msg);
      return;
    }
    const comment = normalizeComment(response.data);
    return comment;
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async (
    payload: { content: string; dropId: string; commentId: string },
    { getState }
  ) => {
    const token = (getState() as any).user.token;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    const response = await updateCommentService({ token, ...payload });
    if (response.isError) toast.error(response.msg);
    else toast.success(response.msg);
  }
);
