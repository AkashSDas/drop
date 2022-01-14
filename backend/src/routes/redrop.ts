import { Router } from "express";
import { createReDrop } from "../controllers/redrop";
import { isLoggedIn } from "../middlewares/user";
import { runAsync } from "../utils/async";
import { errorHandler } from "../utils/error";

export const router = Router();

router
  .route("/:dropId")
  .get(
    runAsync(isLoggedIn),
    errorHandler,
    runAsync(createReDrop),
    errorHandler
  );
