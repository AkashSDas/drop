import { Router } from "express";
import {
  createReDrop,
  deleteReDrop,
  getUserReDrops,
} from "../controllers/redrop";
import { isLoggedIn } from "../middlewares/user";
import { runAsync } from "../utils/async";
import { errorHandler } from "../utils/error";

export const router = Router();

router
  .route("/drop/:dropId")
  .get(
    runAsync(isLoggedIn),
    errorHandler,
    runAsync(createReDrop),
    errorHandler
  );

router
  .route("/:redropId")
  .get(
    runAsync(isLoggedIn),
    errorHandler,
    runAsync(deleteReDrop),
    errorHandler
  );

router.route("/user/:userId").get(runAsync(getUserReDrops), errorHandler);
