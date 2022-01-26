import { Router } from "express";
import {
  createDrop,
  deleteDrop,
  getDrop,
  getDrops,
  getUserDrops,
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
  .get(runAsync(getDrop), errorHandler)
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

router.route("/user/:userId").get(runAsync(getUserDrops), errorHandler);
