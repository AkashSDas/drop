import { Router } from "express";
import {
  confirmResetPassword,
  login,
  logout,
  resetPassword,
  signup,
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
