import { IUser } from "../../src/models/user";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}
