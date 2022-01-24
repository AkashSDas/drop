import { Drop } from "../models/drop";
import { User } from "../models/user";
import { BaseApiError } from "../utils/error";
import { addIdField } from "../utils/mongo_cursor_pagination";
import { responseMsg } from "../utils/response";
import { AsyncMiddleware } from "../utils/types";
import { Reaction } from "../models/reaction";
import { reactionsData } from "../utils/reactions";

export const createDrop: AsyncMiddleware = async (req, res, next) => {
  if (!req.body.content) {
    return next(new BaseApiError(400, "Content is required"));
  }

  const drop = await Drop.create({
    user: req.user._id,
    content: req.body.content,
  });

  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Drop created",
    data: { drop },
  });
};

export const updateDropContent: AsyncMiddleware = async (req, res, next) => {
  if (!req.body.content) {
    return next(new BaseApiError(400, "Content is required"));
  }

  const drop = await Drop.findById(req.params.dropId);
  if (!drop) {
    return next(new BaseApiError(400, "Drop does not exists"));
  }

  // Check if req.user is the drop.user i.e. author of this drop
  if (req.user._id.toString() !== drop.user._id.toString()) {
    return next(new BaseApiError(401, "You're not authorized to do that"));
  }

  drop.content = req.body.content;
  await drop.save();

  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Drop updated",
    data: { drop },
  });
};

export const deleteDrop: AsyncMiddleware = async (req, res, next) => {
  const drop = await Drop.findById(req.params.dropId);
  if (!drop) {
    return next(new BaseApiError(400, "Drop does not exists"));
  }

  // Check if req.user is the drop.user i.e. author of this drop
  if (req.user._id.toString() !== drop.user._id.toString()) {
    return next(new BaseApiError(401, "You're not authorized to do that"));
  }

  await drop.remove();

  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Drop deleted",
    data: { drop },
  });
};

// Get drops, paginated
export const getDrops: AsyncMiddleware = async (req, res, next) => {
  const nextId = req.query.next;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;
  const user = req.query.user;

  const data = await (Drop as any).paginateDrop({
    limit,
    paginatedField: "updatedAt",
    next: nextId,
  });

  const drops = addIdField(data.results);
  let dropsWithReactions = [];
  for (let i = 0; i < drops.length; i++) {
    const drop = await Drop.populate(drops[i], "user");

    // Get reactions on this drop
    let reactionsOnDrop = {};
    for (let i = 0; i < reactionsData.length; i++) {
      const r = reactionsData[i];
      const count = await Reaction.count({ drop: drop._id, reaction: r.name });
      reactionsOnDrop[r.name] = { name: r.name, emoji: r.emoji, count };
    }

    // Check if user has reacted on this drop or not
    let reacted = null;
    if (user) {
      reacted = await Reaction.findOne({ drop: drop._id, user: user }).select(
        "reaction id"
      );
    }

    dropsWithReactions.push({
      drop: drop,
      reactionsOnDrop,
      reacted,
    });
  }

  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: `${data.results.length} drops retrieved`,
    data: {
      drops: dropsWithReactions,
      previous: data.previous,
      hasPrevious: data.hasPrevious,
      next: data.next,
      hasNext: data.hasNext,
    },
  });
};

export const getUserDrops: AsyncMiddleware = async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return next(new BaseApiError(400, "User does not exists"));
  }

  const nextId = req.query.next;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;

  const data = await (Drop as any).paginateDrop({
    limit,
    query: { user: user._id },
    paginatedField: "updatedAt",
    next: nextId,
  });

  const drops = addIdField(data.results);
  let dropsWithReactions = [];
  for (let i = 0; i < drops.length; i++) {
    const drop = await Drop.populate(drops[i], "user");

    // Get reactions on this drop
    let reactionsOnDrop = {};
    for (let i = 0; i < reactionsData.length; i++) {
      const r = reactionsData[i];
      const count = await Reaction.count({ drop: drop._id, reaction: r.name });
      reactionsOnDrop[r.name] = { name: r.name, emoji: r.emoji, count };
    }

    // Check if user has reacted on this drop or not
    let reacted = null;
    if (user) {
      reacted = await Reaction.findOne({ drop: drop._id, user: user }).select(
        "reaction id"
      );
    }

    dropsWithReactions.push({
      drop: drop,
      reactionsOnDrop,
      reacted,
    });
  }

  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: `${data.results.length} drops retrieved`,
    data: {
      drops: dropsWithReactions,
      previous: data.previous,
      hasPrevious: data.hasPrevious,
      next: data.next,
      hasNext: data.hasNext,
    },
  });
};
