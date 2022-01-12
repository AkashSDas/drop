import { Response } from "express";
import { IUser } from "../models/user";
import { responseMsg } from "./response";

export const loginUser = (user: IUser, res: Response, msg: string) => {
  const token = user.getJwtToken();
  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg,
    data: { user, token },
  });
};
