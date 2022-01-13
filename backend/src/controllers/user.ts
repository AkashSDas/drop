import { User } from "../models/user";
import { BaseApiError } from "../utils/error";
import { responseMsg } from "../utils/response";
import { AsnycMiddleware } from "../utils/types";
import { loginUser } from "../utils/user";

export const signup: AsnycMiddleware = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!email || !username || !password) {
    return next(new BaseApiError(400, "Some or all fields are missing"));
  }

  const user = await User.create({ username, email, password });
  user.password = undefined; // no sending user password to client
  return loginUser(user, res, "Account created successfully");
};

export const login: AsnycMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BaseApiError(400, "Some or all fields are missing"));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new BaseApiError(400, "User doesn't exists"));

  if (!(await user.isAuthenticated(password))) {
    return next(new BaseApiError(400, "Wrong password"));
  }

  user.password = undefined; // no sending user password to client
  return loginUser(user, res, "Successfully logged in");
};

export const logout: AsnycMiddleware = async (req, res) => {
  // removing token from cookie (although its not used for auth)
  // since token is used for auth, its work in frontend to rm auth
  // token from frontend
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Successfully logged out",
  });
};
