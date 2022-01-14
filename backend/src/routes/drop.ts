import { Router } from "express";
import {
  createDrop,
  deleteDrop,
  getDrops,
  updateDropContent,
} from "../controllers/drop";
import { isLoggedIn } from "../middlewares/user";
import { runAsync } from "../utils/async";
import { errorHandler } from "../utils/error";

export const router = Router();

router
  .route("/")
  .post(runAsync(isLoggedIn), errorHandler, runAsync(createDrop), errorHandler)
  .get(runAsync(getDrops), errorHandler);

router
  .route("/:dropId")
  .put(
    runAsync(isLoggedIn),
    errorHandler,
    runAsync(updateDropContent),
    errorHandler
  )
  .delete(
    runAsync(isLoggedIn),
    errorHandler,
    runAsync(deleteDrop),
    errorHandler
  );
