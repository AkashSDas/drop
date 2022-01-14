import { Router } from "express";
import { createComment, updateCommentContent } from "../controllers/comment";
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

router
  .route("/:commentId/drop/:dropId")
  .put(
    runAsync(isLoggedIn),
    errorHandler,
    runAsync(updateCommentContent),
    errorHandler
  );
