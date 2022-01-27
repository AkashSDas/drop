import { User } from "../models/user";
import { sendEmail } from "../utils/email";
import { BaseApiError } from "../utils/error";
import { responseMsg } from "../utils/response";
import { AsyncMiddleware } from "../utils/types";
import { loginUser } from "../utils/user";
import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";

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
    new Date(Date.now() + 5 * 60 * 1000)
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

export const verifyEmail: AsyncMiddleware = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new BaseApiError(400, "User doesn't exists"));

  // Expires in 5mins
  const emailverifyToken = user.getEmailVerifyToken(
    new Date(Date.now() + 5 * 60 * 1000)
  );

  await user.save({ validateModifiedOnly: true });

  // URL sent to user for verifying user's email
  const confirmEmailURL = `${req.protocol}://${req.get(
    "host"
  )}/api/user/confirm-email/${emailverifyToken}`;

  const msg = `Copy paste this link in your URL and hit enter\n\n${confirmEmailURL}`;

  try {
    await sendEmail({
      toEmail: user.email,
      subject: "Verify your account",
      text: msg,
    });

    return responseMsg(res, {
      statusCode: 200,
      isError: false,
      msg: "Email is sent to your registered email address. Verify it to sign up",
    });
  } catch (err) {
    user.emailVerifyToken = undefined;
    user.emailVerifyExpiry = undefined;
    await user.save({ validateModifiedOnly: true });
    return next(new BaseApiError(500, (err as Error).message));
  }
};

export const confirmVerifyEmail: AsyncMiddleware = async (req, res, next) => {
  const token = req.params.token;
  const encryptToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    emailVerifyToken: encryptToken,
    emailVerifyExpiry: { $gt: new Date(Date.now()) },
  });

  if (!user) return next(new BaseApiError(400, "Token is invalid or expired"));

  user.active = true;
  user.emailVerifyToken = undefined;
  user.emailVerifyExpiry = undefined;
  await user.save();

  return loginUser(user, res, "Account is verified");
};

export const getUserInfo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new BaseApiError(401, "You are not logged in"));
  }

  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "User info",
    data: { user: req.user },
  });
};

export const changePassword: AsyncMiddleware = async (req, res, next) => {
  if (!req.user) {
    return next(new BaseApiError(401, "You are not logged in"));
  }

  const userId = req.user.id;
  const user = await User.findById(userId).select("+password");
  const correctPwd = await user.isAuthenticated(req.body.oldPassword);
  if (!correctPwd) return next(new BaseApiError(401, "Incorrect password"));
  user.password = req.body.newPassword;
  await user.save();
  user.password = undefined;
  return loginUser(user, res, "Password updated successfully");
};

// Client has to sent all the fields (the ones which they are updating and
// the others which they are not updating but are in user model)
export const changeUserInfo: AsyncMiddleware = async (req, res, next) => {
  if (!req.user) {
    return next(new BaseApiError(401, "You are not logged in"));
  }

  // newData will have fields that user is allowed to updated
  const newData: { [key: string]: any } = {
    username: req.body.username,
    email: req.body.email,
  };

  if (req.files?.profilePic) {
    // Check if user has profile pic or not
    if (req.user.profilePic) {
      // Delete img
      await cloudinary.v2.uploader.destroy(req.user.profilePic.id);
    }

    // Upload img
    const file = (req.files.profilePic as fileUpload.UploadedFile).tempFilePath;
    const result = await cloudinary.v2.uploader.upload(file, {
      folder: "drop/profilePics",
      crop: "scale",
      width: 150,
    });
    newData.profilePic = {
      id: result.public_id,
      URL: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
  });

  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Successfully updated the user",
    data: { user },
  });
};

// Without pagination
export const getAllUsers: AsyncMiddleware = async (req, res) => {
  const users = await User.find();
  responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "All users",
    data: { users },
  });
};

// Without pagination
export const getAllMembers: AsyncMiddleware = async (req, res) => {
  const users = await User.find({ role: "member" });
  responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "All users",
    data: { users },
  });
};

export const getUser: AsyncMiddleware = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new BaseApiError(400, "User does not exists"));
  }

  responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "User info",
    data: { user },
  });
};

export const leaderChangeUserInfo: AsyncMiddleware = async (req, res, next) => {
  if (!req.user) {
    return next(new BaseApiError(401, "You are not logged in"));
  }

  // newData will have fields that user is allowed to updated
  const newData: { [key: string]: any } = {
    username: req.body.username,
    email: req.body.email,
    role: req.body.role, // check if the role is one from the opts available
  };

  // User whose data we're updating
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) return next(new BaseApiError(401, "User does not exists"));

  if (req.files?.profilePic) {
    // Check if user has profile pic or not
    if (user.profilePic) {
      // Delete img
      await cloudinary.v2.uploader.destroy(user.profilePic.id);
    }

    // Upload img
    const file = (req.files.profilePic as fileUpload.UploadedFile).tempFilePath;
    const result = await cloudinary.v2.uploader.upload(file, {
      folder: "drop/profilePics",
      crop: "scale",
      width: 150,
    });
    newData.profilePic = {
      id: result.public_id,
      URL: result.secure_url,
    };
  }

  const updatedUser = await User.findByIdAndUpdate(user.id, newData, {
    new: true,
    runValidators: true,
  });

  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Successfully updated the user",
    data: { user: updatedUser },
  });
};

export const deleteUser: AsyncMiddleware = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new BaseApiError(401, "User does not exists"));

  // Delete user profile pic
  const imgId = user.profilePic?.id;
  if (imgId) await cloudinary.v2.uploader.destroy(imgId);

  await user.remove();
  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Deleted user",
  });
};

export const getUserWithoutAuth: AsyncMiddleware = async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return next(new BaseApiError(400, "User does not exists"));
  }

  responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "User info",
    data: { user },
  });
};
