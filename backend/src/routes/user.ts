import { Router } from "express";
import {
  confirmResetPassword,
  confirmVerifyEmail,
  login,
  logout,
  resetPassword,
  signup,
  verifyEmail,
} from "../controllers/user";
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
