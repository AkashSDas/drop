import cors from "cors";
import express from "express";
import * as morgan from "morgan";

// App
export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan.default("tiny"));

// Test api route
app.get("/", (_, res) => res.status(200).send("Hello mom"));
