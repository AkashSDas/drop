import { NextFunction, Request, Response } from "express";
import { AsyncMiddleware } from "./types";

// Catching Errors in Async Functions
export const runAsync = (fn: AsyncMiddleware) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);
  };
};
