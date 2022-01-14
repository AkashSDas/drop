import { Relationship } from "../models/relationship";
import { User } from "../models/user";
import { BaseApiError } from "../utils/error";
import { responseMsg } from "../utils/response";
import { AsyncMiddleware } from "../utils/types";

// req.user is the follower
export const createRelationship: AsyncMiddleware = async (req, res, next) => {
  if (!req.user) return next(new BaseApiError(401, "You're not logged in"));
  const followed = await User.findById(req.params.followedId);
  if (!followed) return next(new BaseApiError(400, "Followed doesn't exists"));

  // User cannot follow themselves
  if (req.user._id.toString() === followed._id.toString()) {
    return next(new BaseApiError(400, "You cannot follow yourself"));
  }

  // Check if req.user already follows the followed
  const exists = await Relationship.findOne({
    follower: req.user._id,
    followed: followed._id,
  });
  if (exists) return next(new BaseApiError(400, "Relationship already exists"));

  const relationship = await Relationship.create({
    follower: req.user._id,
    followed: followed._id,
  });
  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Following",
    data: { relationship },
  });
};

// req.user is the follower
export const deleteRelationship: AsyncMiddleware = async (req, res, next) => {
  if (!req.user) return next(new BaseApiError(401, "You're not logged in"));
  const relationship = await Relationship.findById(req.params.relationshipId);
  if (!relationship) {
    return next(new BaseApiError(400, "Relationship doesn't exists"));
  }
  await relationship.remove();

  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Unfollowed",
    data: { relationship },
  });
};
