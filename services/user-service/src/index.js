import express from "express";
import prisma from "./config/prisma.js";
import authController from "./auth/auth.controller.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authController);

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({
    users,
  });
});

app.listen(3001, () => {
  console.log("User Service running on port 3001");
});
