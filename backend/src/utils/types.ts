import { NextFunction, Request, Response } from "express";

export type AsnycMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export type AsnycIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
) => Promise<void>;

export type AsyncController = (req: Request, res: Response) => Promise<void>;
