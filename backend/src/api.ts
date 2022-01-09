import cors from "cors";
import express from "express";

// App
export const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // parse incoming data with Content-Type as application/json

// Test api route
// app.get("/", (_, res) => res.status(200).send("Hello mom"));
