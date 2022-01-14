import { Router } from "express";
import { deleteReaction, setReaction } from "../controllers/reaction";
import { isLoggedIn } from "../middlewares/user";
import { runAsync } from "../utils/async";
import { errorHandler } from "../utils/error";

export const router = Router();

router
  .route("/drop/:dropId")
  .post(runAsync(isLoggedIn), errorHandler, runAsync(setReaction), errorHandler)
  .delete(
    runAsync(isLoggedIn),
    errorHandler,
    runAsync(deleteReaction),
    errorHandler
  );
