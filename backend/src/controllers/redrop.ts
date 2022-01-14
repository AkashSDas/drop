import { Drop } from "../models/drop";
import { ReDrop } from "../models/redrop";
import { User } from "../models/user";
import { BaseApiError } from "../utils/error";
import { addIdField } from "../utils/mongo_cursor_pagination";
import { responseMsg } from "../utils/response";
import { AsyncMiddleware } from "../utils/types";

export const createReDrop: AsyncMiddleware = async (req, res, next) => {
  if (!req.user) return next(new BaseApiError(401, "You're not logged in"));
  const drop = await Drop.findById(req.params.dropId);
  if (!drop) return next(new BaseApiError(400, "Drop doesn't exists"));

  // Check if redrop (for this drop and req.user) exists or not
  const exists = await ReDrop.findOne({ drop: drop._id, user: req.user._id });
  if (exists) return next(new BaseApiError(400, "Redrop already exists"));

  const reDrop = await ReDrop.create({ user: req.user._id, drop: drop._id });
  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Redrop created",
    data: { reDrop },
  });
};

export const deleteReDrop: AsyncMiddleware = async (req, res, next) => {
  if (!req.user) return next(new BaseApiError(401, "You're not logged in"));
  const redrop = await ReDrop.findById(req.params.redropId);
  if (!redrop) return next(new BaseApiError(400, "Redrop doesn't exists"));
  await redrop.remove();
  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Redrop deleted",
    data: { redrop },
  });
};

export const getUserReDrops: AsyncMiddleware = async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) return next(new BaseApiError(400, "User does not exists"));

  const nextId = req.query.next;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;

  const data = await (ReDrop as any).paginateReDrop({
    limit,
    query: { user: user._id },
    paginatedField: "updatedAt",
    next: nextId,
  });

  const redrops = addIdField(data.results);

  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: `${data.results.length} redrops retrieved`,
    data: {
      redrops,
      previous: data.previous,
      hasPrevious: data.hasPrevious,
      next: data.next,
      hasNext: data.hasNext,
    },
  });
};
