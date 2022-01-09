// First loading env variables a
import { config } from "dotenv";
config();

import { app } from "./api";

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`API is available on http://localhost:${port}`)
);
