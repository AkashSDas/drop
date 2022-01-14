import { Drop } from "../models/drop";
import { BaseApiError } from "../utils/error";
import { responseMsg } from "../utils/response";
import { AsyncMiddleware } from "../utils/types";

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
