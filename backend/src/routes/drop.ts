import { Router } from "express";
import { createDrop, updateDropContent } from "../controllers/drop";
import { isLoggedIn } from "../middlewares/user";
import { runAsync } from "../utils/async";
import { errorHandler } from "../utils/error";

export const router = Router();

router.post(
  "/",
  runAsync(isLoggedIn),
  errorHandler,
  runAsync(createDrop),
  errorHandler
);

router
  .route("/:dropId")
  .put(
    runAsync(isLoggedIn),
    errorHandler,
    runAsync(updateDropContent),
    errorHandler
  );
