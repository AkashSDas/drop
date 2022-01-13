import { User } from "../models/user";
import { sendEmail } from "../utils/email";
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

export const resetPassword: AsnycMiddleware = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new BaseApiError(400, "User doesn't exists"));

  // Expires in 5mins
  const passwordResetToken = user.getPasswordResetToken(
    new Date(Date.now() * 5 * 60 * 1000)
  );

  // Saving the passwordResetToken and passwordResetExpiry fields set by
  // user.getPasswordResetToken
  await user.save({ validateModifiedOnly: true });

  // URL sent to user for resetting password
  const confirmPasswordResetURL = `${req.protocol}://${req.get(
    "host"
  )}/confirm-reset-password/${passwordResetToken}`;

  const msg = `Copy paste this link in your URL and hit enter\n\n${confirmPasswordResetURL}`;

  try {
    await sendEmail({
      toEmail: user.email,
      subject: "Reset password",
      text: msg,
    });

    return responseMsg(res, {
      statusCode: 200,
      isError: false,
      msg: "Send password reset instructions to your email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpiry = undefined;
    await user.save({ validateModifiedOnly: true });
    return next(new BaseApiError(500, (err as Error).message));
  }
};
