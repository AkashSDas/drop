import { Relationship } from "../models/relationship";
import { User } from "../models/user";
import { BaseApiError } from "../utils/error";
import { addIdField } from "../utils/mongo_cursor_pagination";
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

export const getUserAllFollowers: AsyncMiddleware = async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) return next(new BaseApiError(400, "User does not exists"));

  const nextId = req.query.next;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;

  const data = await (Relationship as any).paginateRelationship({
    limit,
    query: { followed: user._id },
    paginatedField: "updatedAt",
    next: nextId,
  });

  const followersWithIds = addIdField(data.results);
  const { user: selfUser } = req.query; // user who has sent request
  let followers = [];
  for (let i = 0; i < followersWithIds.length; i++) {
    const relationship = await Relationship.populate(
      followersWithIds[i],
      "follower followed"
    );
    let isFollowing = null;

    if (selfUser) {
      isFollowing = await Relationship.findOne({
        followed: relationship.follower._id,
        follower: selfUser as any,
      }).select("+_id");
    }

    followers.push({
      ...relationship,
      isFollowing: isFollowing ? true : false,
      relationshipId: isFollowing ? isFollowing._id : null,
    });
  }

  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: `${data.results.length} followers retrieved`,
    data: {
      followers,
      previous: data.previous,
      hasPrevious: data.hasPrevious,
      next: data.next,
      hasNext: data.hasNext,
    },
  });
};

export const getUserAllFollowed: AsyncMiddleware = async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) return next(new BaseApiError(400, "User does not exists"));

  const nextId = req.query.next;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;

  const data = await (Relationship as any).paginateRelationship({
    limit,
    query: { follower: user._id },
    paginatedField: "updatedAt",
    next: nextId,
  });

  const followedWithIds = addIdField(data.results);
  const { user: selfUser } = req.query; // user who has sent request
  let followed = [];
  for (let i = 0; i < followedWithIds.length; i++) {
    const relationship = await Relationship.populate(
      followedWithIds[i],
      "follower followed"
    );
    let isFollowing = null;

    if (selfUser) {
      isFollowing = await Relationship.findOne({
        followed: relationship._id,
        follower: selfUser as any,
      }).select("+_id");
    }

    followed.push({
      ...relationship,
      isFollowing: isFollowing ? true : false,
      relationshipId: isFollowing ? isFollowing._id : null,
    });
  }

  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: `${data.results.length} followed retrieved`,
    data: {
      followed,
      previous: data.previous,
      hasPrevious: data.hasPrevious,
      next: data.next,
      hasNext: data.hasNext,
    },
  });
};
