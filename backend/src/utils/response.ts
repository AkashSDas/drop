import { Response } from "express";

// All of the response should have the following things
interface ResponseMsg {
  statusCode: number;
  isError: boolean;
  msg: string;
  data?: { [key: string]: any };
}

// All of the responses should be send using this function
// Middlewares shouldn't use this as this send response to the client
export const responseMsg = (res: Response, options: ResponseMsg): void => {
  const { statusCode, isError, msg, data } = options;
  res.status(statusCode).json({ isError, msg, data });
};
