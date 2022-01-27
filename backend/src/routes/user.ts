import { Router } from "express";
import {
  changePassword,
  changeUserInfo,
  confirmResetPassword,
  confirmVerifyEmail,
  deleteUser,
  getAllMembers,
  getAllUsers,
  getUser,
  getUserInfo,
  getUserWithoutAuth,
  leaderChangeUserInfo,
  login,
  logout,
  resetPassword,
  signup,
  verifyEmail,
} from "../controllers/user";
import { checkRole, isLoggedIn } from "../middlewares/user";
import { runAsync } from "../utils/async";
import { errorHandler } from "../utils/error";

export const router = Router();

router.post("/signup", runAsync(signup), errorHandler);
router.post("/login", runAsync(login), errorHandler);
router.get("/logout", logout);
router.post("/reset-password", runAsync(resetPassword), errorHandler);
router.post(
  "/confirm-reset-password/:token",
  runAsync(confirmResetPassword),
  errorHandler
);
router.post("/verify-email", runAsync(verifyEmail), errorHandler);
router.get(
  "/confirm-verify-email/:token",
  runAsync(confirmVerifyEmail),
  errorHandler
);
router.get(
  "/profile",
  runAsync(isLoggedIn),
  errorHandler,
  getUserInfo,
  errorHandler
);
router.post(
  "/change-password",
  runAsync(isLoggedIn),
  errorHandler,
  changePassword,
  errorHandler
);
router.post(
  "/change-info",
  runAsync(isLoggedIn),
  errorHandler,
  changeUserInfo,
  errorHandler
);
router.get(
  "/leader/users",
  runAsync(isLoggedIn),
  errorHandler,
  checkRole("leader"),
  errorHandler,
  runAsync(getAllUsers),
  errorHandler
);
router.get(
  "/elder/users",
  runAsync(isLoggedIn),
  errorHandler,
  checkRole("elder"),
  errorHandler,
  runAsync(getAllMembers),
  errorHandler
);
router.get(
  "/leader/user/:id",
  runAsync(isLoggedIn),
  errorHandler,
  checkRole("leader"),
  errorHandler,
  runAsync(getUser),
  errorHandler
);
router.put(
  "/leader/user/:id",
  runAsync(isLoggedIn),
  errorHandler,
  checkRole("leader"),
  errorHandler,
  runAsync(leaderChangeUserInfo),
  errorHandler
);
router.delete(
  "/leader/user/:id",
  runAsync(isLoggedIn),
  errorHandler,
  checkRole("leader"),
  errorHandler,
  runAsync(deleteUser),
  errorHandler
);
router.get("/:userId", runAsync(getUserWithoutAuth), errorHandler);
