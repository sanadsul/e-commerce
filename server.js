import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import connectDB from "./configs/db.js";
import { indexRouter } from "./routes/index.js";
import cookieParser from "cookie-parser";
import { errorHandlerUrl } from "./utils/errorHandlerUrl.js";

/* Environment Variables */
dotenv.config();


/* Server Connection */
const app = express();


/* Database Connection */
connectDB();


/* Error middleware { JSON Format } */
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res
      .status(400)
      .json({ message: "Invalid JSON format", error: err.message });
  }
  next();
});


/* Middleware */
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json({
  limit: "10mb",
}));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(helmet());

/* Routes */
app.use("/api/v1", indexRouter);


/* Error Handler url */
app.use("/*", errorHandlerUrl);


/* Error middleware { JSON Format } */
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res
      .status(400)
      .json({ status: "Failed", message: "Invalid format" });
  }
  next();
});


/* Server Port */
const Port = process.env.PORT || 3002;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
