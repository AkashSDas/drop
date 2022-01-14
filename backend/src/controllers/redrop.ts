import { Drop } from "../models/drop";
import { ReDrop } from "../models/redrop";
import { BaseApiError } from "../utils/error";
import { responseMsg } from "../utils/response";
import { AsyncMiddleware } from "../utils/types";

export const createReDrop: AsyncMiddleware = async (req, res, next) => {
  if (!req.user) return next(new BaseApiError(401, "You're not logged in"));
  const drop = await Drop.findById(req.params.dropId);
  if (!drop) return next(new BaseApiError(400, "Drop doesn't exists"));
  const reDrop = await ReDrop.create({ user: req.user._id, drop: drop._id });
  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Redrop created",
    data: { reDrop },
  });
};
