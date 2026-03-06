import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

//routes imports
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use("/uploads", express.static("public/uploads"));

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);

export { app };
