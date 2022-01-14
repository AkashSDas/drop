import { Router } from "express";
import { createRelationship } from "../controllers/relationship";
import { isLoggedIn } from "../middlewares/user";
import { runAsync } from "../utils/async";
import { errorHandler } from "../utils/error";

export const router = Router();

router
  .route("/:followedId")
  .get(
    runAsync(isLoggedIn),
    errorHandler,
    runAsync(createRelationship),
    errorHandler
  );
