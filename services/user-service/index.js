import express from "express";
import prisma from "./config/prisma.js";
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({
    users,
  });
});

app.listen(3001, () => {
  console.log("User Service running on port 3001");
});
