import { Drop } from "../models/drop";
import { ReDrop } from "../models/redrop";
import { BaseApiError } from "../utils/error";
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
