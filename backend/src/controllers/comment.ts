import { Comment } from "../models/comment";
import { Drop } from "../models/drop";
import { BaseApiError } from "../utils/error";
import { addIdField } from "../utils/mongo_cursor_pagination";
import { responseMsg } from "../utils/response";
import { AsyncMiddleware } from "../utils/types";

export const createComment: AsyncMiddleware = async (req, res, next) => {
  if (!req.body.content) {
    return next(new BaseApiError(400, "Comment is required"));
  }
  if (!req.user) return next(new BaseApiError(401, "You're not logged in"));
  const drop = await Drop.findById(req.params.dropId);
  if (!drop) return next(new BaseApiError(400, "Drop doesn't exists"));

  // Check if comment (for this drop and req.user) exists or not
  const exists = await Comment.findOne({ drop: drop._id, user: req.user._id });
  if (exists) {
    return next(
      new BaseApiError(400, "Comment already exists, update orignal comment")
    );
  }

  const comment = await Comment.create({
    user: req.user._id,
    drop: drop._id,
    content: req.body.content,
  });
  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Comment created",
    data: { comment },
  });
};

export const updateCommentContent: AsyncMiddleware = async (req, res, next) => {
  if (!req.body.content) {
    return next(new BaseApiError(400, "Comment is required"));
  }
  if (!req.user) return next(new BaseApiError(401, "You're not logged in"));
  const drop = await Drop.findById(req.params.dropId);
  if (!drop) return next(new BaseApiError(400, "Drop doesn't exists"));

  // Check if comment (for this drop and req.user) exists or not
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) return next(new BaseApiError(400, "Comment does not exists"));
  if (req.user._id.toString() === comment.user.toString()) {
    return next(new BaseApiError(401, "You are not authorized to do that"));
  }

  comment.content = req.body.content;
  await comment.save();
  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Comment updated",
    data: { comment },
  });
};

export const deleteComment: AsyncMiddleware = async (req, res, next) => {
  if (!req.user) return next(new BaseApiError(401, "You're not logged in"));
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) return next(new BaseApiError(400, "Comment does not exists"));
  if (req.user._id.toString() === comment.user.toString()) {
    return next(new BaseApiError(401, "You are not authorized to do that"));
  }
  await comment.remove();
  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Comment deleted",
    data: { comment },
  });
};

export const getDropComments: AsyncMiddleware = async (req, res, next) => {
  const nextId = req.query.next;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;
  const user = req.query.user;

  const drop = await Drop.findById(req.params.dropId).select("+_id");
  if (!drop) return next(new BaseApiError(400, "Drop doesn't exists"));

  const data = await (Comment as any).paginateComment({
    limit,
    query: { drop: drop._id },
    paginatedField: "updatedAt",
    next: nextId,
  });

  const commentsWithIds = addIdField(data.results);
  let comments = [];
  for (let i = 0; i < commentsWithIds.length; i++) {
    const comment = await Comment.populate(commentsWithIds[i], "user");
    let commented = false; // is user the author of this comment or not
    if (user && (user as string) === comment.user.id.toString()) {
      commented = true;
    }
    comments.push({ comment, commented });
  }

  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: `${data.results.length} comments retrieved`,
    data: {
      comments,
      previous: data.previous,
      hasPrevious: data.hasPrevious,
      next: data.next,
      hasNext: data.hasNext,
    },
  });
};
