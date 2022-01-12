import { Response } from "express";
import { IUser } from "../models/user";
import { responseMsg } from "./response";

export const loginUser = (user: IUser, res: Response) => {
  const token = user.getJwtToken();
  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Account created successfully",
    data: { user, token },
  });
};
