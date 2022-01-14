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
