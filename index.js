import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import createHttpError, { isHttpError } from "http-errors";

import env from "./envalid/ENV.js";
import noteRouter from "./routers/noteRouter.js";

const app = express();
const port = env.PORT || 5000;

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Status is OK!" });
});

app.use("/api", noteRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((error, req, res, next) => {
  console.error(error);

  let errorMessage = "An unknown error occurred";
  let statusCode = 500;

  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.status;
  }

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

mongoose.connect(env.MONGODB)
  .then(() => {
    console.log("MongoDB Connected...");

    app.listen(port, () => {
      console.log(`Server listenning on port http://localhost:${port}`);
    });
  })
  .catch(console.error);