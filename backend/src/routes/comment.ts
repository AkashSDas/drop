import { Router } from "express";
import {
  createComment,
  deleteComment,
  getDropComments,
  updateCommentContent,
} from "../controllers/comment";
import { isLoggedIn } from "../middlewares/user";
import { runAsync } from "../utils/async";
import { errorHandler } from "../utils/error";

export const router = Router();

router
  .route("/drop/:dropId")
  .get(runAsync(getDropComments), errorHandler)
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

router
  .route("/:commentId")
  .delete(
    runAsync(isLoggedIn),
    errorHandler,
    runAsync(deleteComment),
    errorHandler
  );
