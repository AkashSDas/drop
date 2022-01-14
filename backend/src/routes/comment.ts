import { Router } from "express";
import { createComment } from "../controllers/comment";
import { isLoggedIn } from "../middlewares/user";
import { runAsync } from "../utils/async";
import { errorHandler } from "../utils/error";

export const router = Router();

router
  .route("/drop/:dropId")
  .post(
    runAsync(isLoggedIn),
    errorHandler,
    runAsync(createComment),
    errorHandler
  );
