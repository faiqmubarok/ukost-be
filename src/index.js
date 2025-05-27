import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import proxy from "express-http-proxy";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use("/api/v1/users", proxy("http://localhost:3001"));
app.use("/api/v1/products", proxy("http://localhost:3002"));

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running at http://localhost:${PORT}/api/v1`);
});
