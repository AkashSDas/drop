import { AsyncMiddleware } from "../utils/types";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { BaseApiError } from "../utils/error";
import { NextFunction, Request, Response } from "express";

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

// Here roles is an array of one role only. Using list here for ease of
// working with array as opposed to string
// check if roles (which is only one role) is equal to user's role
export const checkRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new BaseApiError(401, "You are not logged in"));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new BaseApiError(403, "You are not allowed for this resource")
      );
    }

    next();
  };
};
