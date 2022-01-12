import { User } from "../models/user";
import { BaseApiError } from "../utils/error";
import { AsnycMiddleware } from "../utils/types";
import { loginUser } from "../utils/user";

export const signup: AsnycMiddleware = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!email || !username || !password) {
    return next(new BaseApiError(400, "Some or all fields are missing"));
  }

  const user = await User.create({ username, email, password });
  user.password = undefined; // no sending user password to client
  return loginUser(user, res);
};
