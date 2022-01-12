import { NextFunction, Request, Response } from "express";

/**
 * Base middleware type
 */
export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

/**
 * Middlewares type for middlewares where id will be only param
 */
export type IdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
) => Promise<void>;

/**
 * Base controller type
 */
export type Controller = (req: Request, res: Response) => Promise<void>;
