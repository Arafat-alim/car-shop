import express from "express";
import cors from "cors";
const app = express();

//! common middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); // allowing request of json type data with limit 16kb (you can update this value)
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // handling the url route request coming from the client
app.use(express.static("public")); // any images, css file, etc

export { app };
