import cors from "cors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { responseMsg } from "./utils/response";
import { router as userRouter } from "./routes/user";
import { router as dropRouter } from "./routes/drop";
import { router as reDropRouter } from "./routes/redrop";
import { router as commentRouter } from "./routes/comment";
import { router as relationshipRouter } from "./routes/relationship";
import { router as reactionRouter } from "./routes/reaction";

// App
export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// Test api route
// app.get("/api/test", (_, res) => res.status(200).send("Hello mom"));

// Routes
app.use("/api/user", userRouter);
app.use("/api/drop", dropRouter);
app.use("/api/redrop", reDropRouter);
app.use("/api/comment", commentRouter);
app.use("/api/relationship", relationshipRouter);
app.use("/api/reaction", reactionRouter);
app.all("*", (req, res) => {
  responseMsg(res, {
    statusCode: 404,
    isError: true,
    msg: `Cannot find ${req.originalUrl} on this server!`,
  });
});
