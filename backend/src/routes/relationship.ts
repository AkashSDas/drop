import { Router } from "express";
import {
  createRelationship,
  deleteRelationship,
  getUserAllFollowers,
} from "../controllers/relationship";
import { isLoggedIn } from "../middlewares/user";
import { runAsync } from "../utils/async";
import { errorHandler } from "../utils/error";

export const router = Router();

router
  .route("/user/:followedId")
  .get(
    runAsync(isLoggedIn),
    errorHandler,
    runAsync(createRelationship),
    errorHandler
  );

router
  .route("/:relationshipId")
  .get(
    runAsync(isLoggedIn),
    errorHandler,
    runAsync(deleteRelationship),
    errorHandler
  );

router
  .route("/user/:userId/followers")
  .get(runAsync(getUserAllFollowers), errorHandler);
