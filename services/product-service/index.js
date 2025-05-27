import express from "express";
import prisma from "./config/prisma.js";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json({ products });
});

app.listen(3002, () => {
  console.log("Product Service running on port 3002");
});
