import { IComment } from "store/drop-comments/types";

import { normalizeDropAuthor } from "./user";

export const normalizeComment = (data: any): IComment => {
  const { comment, commented } = data;
  return {
    id: comment.id,
    dropId: comment.drop,
    content: comment.content,
    user: normalizeDropAuthor(comment.user),
    hasCommented: commented,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    isDeleting: false,
  };
};

export const normalizeComments = (data: any): { [id: string]: IComment } => {
  let comments: { [id: string]: IComment } = {};
  for (let i = 0; i < data.length; i++) {
    const comment = normalizeComment(data[i]);
    comments[comment.id] = comment;
  }
  return comments;
};
