import { NextFunction, Request, Response } from "express";
import { responseMsg } from "./response";

export class BaseApiError extends Error {
  public msg: string;
  public statusCode: number;
  public isOperational: boolean;

  constructor(statusCode: number, msg: string) {
    super(msg);

    this.statusCode = statusCode;
    this.msg = msg;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseApiError) {
    return responseMsg(res, {
      statusCode: err.statusCode,
      msg: err.msg,
      isError: true,
    });
  }

  const statusCode = (err as any)?.statusCode || 500;
  const msg = (err as any)?.msg || "Something went wrong, Please try again";
  return responseMsg(res, { statusCode, msg, isError: true });
};
