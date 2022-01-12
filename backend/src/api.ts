import cors from "cors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import { router as userRouter } from "./routes/user";
import { responseMsg } from "./utils/response";

// App
export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(fileUpload());

// Test api route
// app.get("/api/test", (_, res) => res.status(200).send("Hello mom"));

app.all("*", (req, res) =>
  responseMsg(res, {
    statusCode: 404,
    isError: true,
    msg: `Cannot find ${req.originalUrl} on this server!`,
  })
);
