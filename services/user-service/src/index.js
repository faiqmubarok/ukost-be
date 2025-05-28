import express from "express";
import authController from "./auth/auth.controller.js";
import userController from "./user/user.controller.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/auth", authController);
app.use("/", userController);

app.listen(3001, () => {
  console.log("User Service running on port 3001");
});
