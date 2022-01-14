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
