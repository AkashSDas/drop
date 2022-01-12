import { NextFunction, Request, Response } from "express";
import { AsnycMiddleware } from "./types";

// Catching Errors in Async Functions
export const runAsync = (fn: AsnycMiddleware) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);
  };
};
