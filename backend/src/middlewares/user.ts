import { responseMsg } from "../utils/response";
import { AsyncMiddleware } from "../utils/types";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const isLoggedIn: AsyncMiddleware = async (req, res, next) => {
  const token =
    req.cookies?.token ||
    req.body?.token ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return responseMsg(res, {
      statusCode: 401,
      isError: true,
      msg: "You are not logged in",
    });
  }

  let decoded: string | jwt.JwtPayload;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return responseMsg(res, {
      statusCode: 500,
      isError: true,
      msg: (err as Error).message,
    });
  }

  req.user = await User.findById(decoded);
  next();
};
