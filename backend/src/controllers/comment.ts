import { Comment } from "../models/comment";
import { Drop } from "../models/drop";
import { BaseApiError } from "../utils/error";
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
