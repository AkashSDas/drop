import { AsyncMiddleware } from "../utils/types";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { BaseApiError } from "../utils/error";

export const isLoggedIn: AsyncMiddleware = async (req, res, next) => {
  const token =
    req.cookies?.token ||
    req.body?.token ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return next(new BaseApiError(401, "You are not logged in"));
  }

  let decoded: jwt.JwtPayload;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
  } catch (err) {
    return next(new BaseApiError(500, (err as Error).message));
  }

  req.user = await User.findById(decoded.id);
  next();
};
