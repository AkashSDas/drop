import { User } from "../models/user";
import { sendEmail } from "../utils/email";
import { BaseApiError } from "../utils/error";
import { responseMsg } from "../utils/response";
import { AsyncMiddleware } from "../utils/types";
import { loginUser } from "../utils/user";
import crypto from "crypto";

export const signup: AsyncMiddleware = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!email || !username || !password) {
    return next(new BaseApiError(400, "Some or all fields are missing"));
  }

  const user = await User.create({ username, email, password });
  user.password = undefined; // no sending user password to client
  return loginUser(user, res, "Account created successfully");
};

export const login: AsyncMiddleware = async (req, res, next) => {
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

export const logout: AsyncMiddleware = async (req, res) => {
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

export const resetPassword: AsyncMiddleware = async (req, res, next) => {
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
  )}/api/user/confirm-reset-password/${passwordResetToken}`;

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

export const confirmResetPassword: AsyncMiddleware = async (req, res, next) => {
  const token = req.params.token;

  // Encrypt the token got from URL
  const encryptToken = crypto.createHash("sha256").update(token).digest("hex");

  // If the token is correct then this `encryptToken` (hashed, since the token sent to
  // the user was hashed and saved to that user's doc) should be there in this
  // user's doc (only in one user's doc since this encrypted token will be unique) in
  // the db. So getting the user based on this encryptToken and also
  // the token expiry should be in future (otherwise the token has already expired)
  //
  // TODO: Typing here didn't worked i.e. passwordResetToken is of type any and same
  // is with the other ones.
  const user = await User.findOne({
    passwordResetToken: encryptToken,
    passwordResetExpiry: { $gt: new Date(Date.now()) },
  });

  if (!user) return next(new BaseApiError(400, "Token is invalid or expired"));

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpiry = undefined;

  // Here no validateModifiedOnly needs to be given since we're update few fields
  // and user has already registered meaning all necessary feilds are filled
  await user.save();

  return loginUser(user, res, "Successfully changed your password");
};
