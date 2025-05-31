import express from "express";
import "./events/subscriber.js";
import productController from "./product/product.controller.js";

const app = express();

app.use(express.json());

app.use("/", productController);

app.listen(3002, () => {
  console.log("Product Service running on port 3002");
});
