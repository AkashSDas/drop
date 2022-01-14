import { Drop } from "../models/drop";
import { Reaction } from "../models/reaction";
import { BaseApiError } from "../utils/error";
import { reactionsData } from "../utils/reactions";
import { responseMsg } from "../utils/response";
import { AsyncMiddleware } from "../utils/types";

export const setReaction: AsyncMiddleware = async (req, res, next) => {
  if (!req.user) return next(new BaseApiError(401, "You're not logged in"));
  const drop = await Drop.findById(req.params.dropId);
  if (!drop) return next(new BaseApiError(400, "Drop doesn't exists"));

  const emoji = reactionsData.filter((r) => r.name === req.body.reaction)[0]
    .emoji;

  // Check if reaction (for this drop and req.user) exists or not
  const exists = await Reaction.findOne({ drop: drop._id, user: req.user._id });
  if (exists) {
    // Update reaction
    exists.reaction = req.body.reaction;
    await exists.save();
    return responseMsg(res, {
      statusCode: 200,
      isError: false,
      msg: "Reaction updated",
      data: {
        reaction: {
          ...exists.toJSON(),
          emoji: emoji,
        },
      },
    });
  }

  const reaction = await Reaction.create({
    user: req.user._id,
    drop: drop._id,
    reaction: req.body.reaction,
  });

  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Reaction created",
    data: {
      reaction: {
        ...reaction.toJSON(),
        emoji: emoji,
      },
    },
  });
};

export const deleteReaction: AsyncMiddleware = async (req, res, next) => {
  if (!req.user) return next(new BaseApiError(401, "You're not logged in"));
  const drop = await Drop.findById(req.params.dropId);
  if (!drop) return next(new BaseApiError(400, "Drop doesn't exists"));

  // Check if reaction (for this drop and req.user) exists or not
  const reaction = await Reaction.findOne({
    drop: drop._id,
    user: req.user._id,
  });
  if (!reaction) return next(new BaseApiError(400, "Reaction doesn't exists"));

  // Check is this req.user is reaction user
  if (reaction.user._id.toString() !== req.user._id.toString()) {
    return next(new BaseApiError(400, "You are not allowed to do that"));
  }

  await reaction.remove();

  const emoji = reactionsData.filter((r) => r.name === reaction.reaction)[0]
    .emoji;

  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Reaction deleted",
    data: {
      reaction: {
        ...reaction.toJSON(),
        emoji: emoji,
      },
    },
  });
};
